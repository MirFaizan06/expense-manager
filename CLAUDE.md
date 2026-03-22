# Claude.md – Expense Manager for Mom (React Native Expo)

This document provides a complete specification for building a **React Native Expo** app that helps my mom manage daily expenses with remarks, timestamps, local storage, multi‑currency support, report generation, and import/export functionality. The app follows a clean, aesthetic design with a nature‑inspired theme (default) and a dark mode option.

All code examples use **StyleSheet** for styling (no Tailwind). The final implementation will be written by Claude based on this guide.

---

## 1. Overview & Requirements

- **Platform:** React Native (Expo managed workflow)
- **Storage:** Local (AsyncStorage)
- **Authentication:** Simple login – credentials stored locally (no remote server)
- **Transactions:**  
  - Credit (add money) or debit (remove money)  
  - Amount in selected currency (default ₹, with support for IDR, Yen, USD, etc.)  
  - Mandatory remark  
  - Local timestamp (automatic)  
- **Reports:** Daily summary (credits, debits, net) – viewable and saved locally  
- **Export/Import:**  
  - Export all data (user + transactions) as JSON  
  - Export versioning (1.0, 1.1, …) – increments on each export  
  - Import a previously exported JSON to restore data  
- **Themes:** Nature (default) & Dark Mode – switchable in settings  
- **Developer info:**  
  - Name: The NxT LvL aka Faizan  
  - Company: Hachi wa Studios  
  - App version: 1.0.0  
  - Instagram: is_anxt  
  - YouTube: @TheNxTLvL  

---

## 2. Tech Stack & Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | Expo SDK |
| `expo-status-bar` | Status bar control |
| `@react-navigation/native` + `@react-navigation/bottom-tabs` + `@react-navigation/stack` | Navigation |
| `react-native-paper` | UI components (optional but recommended for aesthetics) |
| `@react-native-async-storage/async-storage` | Local storage |
| `react-native-vector-icons` or `@expo/vector-icons` | Icons |
| `react-native-picker-select` or custom modal | Currency selection |
| `react-native-modal-datetime-picker` (optional) | For custom timestamp if needed (but we use automatic local time) |

Install with:
```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack react-native-paper @react-native-async-storage/async-storage @expo/vector-icons react-native-picker-select
```

---

## 3. Project Structure

```
src/
├── components/
│   ├── TransactionItem.js       // single transaction display
│   ├── CurrencySelector.js      // dropdown for currency
│   ├── ThemeToggle.js           // switch between nature/dark
│   └── ReportCard.js            // daily report summary card
├── screens/
│   ├── LoginScreen.js
│   ├── HomeScreen.js            // main dashboard: balance, recent transactions, add transaction button
│   ├── TransactionScreen.js     // form to add a new transaction (or modal)
│   ├── ReportsScreen.js         // daily reports, saved reports
│   ├── SettingsScreen.js        // theme, currency, about, export/import
│   └── ExportImportScreen.js    // export/import actions
├── context/
│   ├── AuthContext.js           // login state
│   ├── TransactionContext.js    // transactions list, balance, add/delete
│   ├── ThemeContext.js          // theme management
│   └── CurrencyContext.js       // current selected currency
├── utils/
│   ├── storage.js               // AsyncStorage helper functions
│   ├── exportImport.js          // JSON export/import with versioning
│   ├── reportGenerator.js       // generate daily reports from transactions
│   └── timestamp.js             // get current local time
├── constants/
│   └── currencies.js            // list of supported currencies (symbol, code)
└── App.js                       // root component
```

---

## 4. Core Data Models

### User
```javascript
{
  username: string,      // e.g., "mom"
  password: string       // simple local password (store as plain text? better to store base64 or just plain – it's local)
}
```

### Transaction
```javascript
{
  id: string,            // uuid
  amount: number,
  currency: string,      // e.g., "INR", "USD", "IDR", "JPY"
  type: "credit" | "debit",
  remark: string,        // mandatory
  timestamp: string,     // ISO string (local time)
  createdAt: number      // epoch for sorting
}
```

### ExportData
```javascript
{
  version: string,       // "1.0", "1.1", …
  exportedAt: string,    // ISO string
  appVersion: "1.0.0",
  user: {
    username: string,
    password: string
  },
  transactions: Array<Transaction>,
  settings: {
    currency: string,
    theme: "nature" | "dark"
  }
}
```

---

## 5. State Management & Storage

We'll use **React Context** for global state:

- **AuthContext**: stores login status, username, password.
- **TransactionContext**: stores `transactions` array and methods (`addTransaction`, `deleteTransaction`). Also calculates balance.
- **ThemeContext**: stores current theme, toggle function.
- **CurrencyContext**: stores selected currency, change function.

All data is persisted to AsyncStorage using helper functions:
- `loadData()` – loads user, transactions, settings on app start.
- `saveTransactions(transactions)` – stores transactions.
- `saveUser(user)` – stores user.
- `saveSettings(settings)` – stores settings.

---

## 6. Navigation Structure

We'll use a **Stack Navigator** for login and a **Bottom Tab Navigator** for the main app.

```javascript
// App.js
<NavigationContainer>
  <AuthContext.Provider>
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Main">
          {() => (
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Reports" component={ReportsScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
              <Tab.Screen name="Export/Import" component={ExportImportScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  </AuthContext.Provider>
</NavigationContainer>
```

---

## 7. Screens & Components (with Code Examples)

### 7.1 LoginScreen

- Simple form: username, password
- Validation: both fields required
- On submit, check stored credentials (if any). If no credentials exist, create them (first login).
- After login, navigate to main app.

**Example (styling with StyleSheet):**

```javascript
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) return;
    await login(username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
```

### 7.2 HomeScreen (Dashboard)

- Displays current balance in selected currency.
- Shows a list of recent transactions (last 5).
- Button to add new transaction (opens a modal or navigates to TransactionScreen).
- A currency selector (global) to change the display currency – note: all stored amounts are in their original currency; conversion is not required, just display the amount with its own currency symbol. But for balance, we need to show sum in the selected currency? This can get complicated. Simpler: each transaction has its own currency; balance is just the sum of all amounts (with sign), but mixing currencies is not meaningful. Better to enforce a **single global currency** for all transactions. Let's simplify: the user selects one currency (e.g., INR) and all transactions are recorded in that currency. This avoids conversion complexity. We'll implement that: global currency setting that applies to all new transactions; previous transactions remain in their original currency but balance is shown in that currency? Actually if we change currency later, old transactions are in old currency – messy. So we'll make the **currency a setting** that is fixed (user can change it, but all transactions are recorded in that currency). The app will not convert historical data. This is simpler and meets the requirement: "supports more currencies" – meaning the user can pick a currency at the start and all entries use that currency. They can change later, but it will affect new entries only.

Thus, we have a `CurrencyContext` that stores the selected currency. Transactions are always stored with that currency. Balance is calculated as sum of credit amounts minus debit amounts.

**Example HomeScreen (partial):**

```javascript
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTransaction } from '../context/TransactionContext';
import { useCurrency } from '../context/CurrencyContext';
import TransactionItem from '../components/TransactionItem';

export default function HomeScreen({ navigation }) {
  const { transactions, balance } = useTransaction();
  const { currency, symbol } = useCurrency();
  const recent = transactions.slice(-5).reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.balanceLabel}>Current Balance</Text>
      <Text style={styles.balance}>{symbol}{balance.toFixed(2)}</Text>
      <Text style={styles.recentTitle}>Recent Transactions</Text>
      <FlatList
        data={recent}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Transaction')}>
        <Text style={styles.addButtonText}>+ Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f0' }, // nature theme
  balanceLabel: { fontSize: 18, textAlign: 'center', marginTop: 20 },
  balance: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  recentTitle: { fontSize: 20, marginTop: 20, marginBottom: 10 },
  addButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
});
```

### 7.3 TransactionScreen (or Modal)

- Form: amount (numeric), type (credit/debit), remark (text input, mandatory)
- Currency is read-only from global setting.
- On submit, add transaction with current timestamp.
- After adding, go back to Home.

**Example:**

```javascript
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';
import { CurrencyContext } from '../context/CurrencyContext';

export default function TransactionScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('credit'); // 'credit' or 'debit'
  const [remark, setRemark] = useState('');
  const { addTransaction } = useContext(TransactionContext);
  const { currency, symbol } = useContext(CurrencyContext);

  const handleSubmit = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (!remark.trim()) {
      Alert.alert('Error', 'Remark is required');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      currency: currency,
      type,
      remark: remark.trim(),
      timestamp: new Date().toLocaleString(), // human readable local time
      createdAt: Date.now(),
    };
    addTransaction(newTransaction);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount ({symbol})</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
      />
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'credit' && styles.activeCredit]}
          onPress={() => setType('credit')}
        >
          <Text style={styles.typeText}>Credit (+)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'debit' && styles.activeDebit]}
          onPress={() => setType('debit')}
        >
          <Text style={styles.typeText}>Debit (-)</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Remark *</Text>
      <TextInput
        style={[styles.input, styles.remarkInput]}
        value={remark}
        onChangeText={setRemark}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Save Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 20 },
  remarkInput: { height: 80, textAlignVertical: 'top' },
  typeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  typeButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8, marginHorizontal: 5 },
  activeCredit: { backgroundColor: '#4CAF50' },
  activeDebit: { backgroundColor: '#F44336' },
  typeText: { fontWeight: 'bold' },
  submitButton: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold' },
});
```

### 7.4 ReportsScreen

- Generate daily reports from transactions.
- Show list of days with summary: date, total credits, total debits, net.
- Option to view transactions for a selected day.
- Store generated reports (maybe just recompute on demand; but requirement says "generate simple report daily in app, saved it too" – we can save the last generated report, or generate each time the screen loads, and optionally save a copy. We'll implement generation on load and allow saving to local storage (export as JSON or just keep in state).

**Example generation function:**
```javascript
// utils/reportGenerator.js
export const generateDailyReports = (transactions) => {
  const reports = {};
  transactions.forEach(t => {
    const date = new Date(t.createdAt).toDateString();
    if (!reports[date]) {
      reports[date] = { date, totalCredit: 0, totalDebit: 0, transactions: [] };
    }
    if (t.type === 'credit') reports[date].totalCredit += t.amount;
    else reports[date].totalDebit += t.amount;
    reports[date].transactions.push(t);
  });
  return Object.values(reports).sort((a,b) => new Date(b.date) - new Date(a.date));
};
```

In ReportsScreen, call this function and display a list.

### 7.5 SettingsScreen

- Theme toggle (switch between nature and dark).
- Currency selector (dropdown).
- About section with developer info, version, links.

**Theme handling:**
- Use a `ThemeContext` with `isDarkMode` boolean.
- In App.js, wrap with `ThemeProvider` and apply appropriate background/colors to all screens using StyleSheet that depends on theme.

**Example ThemeContext:**
```javascript
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem('theme');
    if (saved !== null) setIsDarkMode(saved === 'dark');
  };

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('theme', newMode ? 'dark' : 'nature');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

Then in each screen, use `useContext(ThemeContext)` to get colors and apply to styles.

### 7.6 ExportImportScreen

- Buttons: **Export Data**, **Import Data**.
- Export: create JSON containing user, transactions, settings, and increment export version. Save to device (using `Share` API or `FileSystem`).
- Import: allow picking a JSON file, validate structure, and restore data (overwrites current).

**Versioning logic:**
- Store current export version in AsyncStorage (e.g., `exportVersion`). Start at "1.0".
- On export, increment version: split version string, increment patch or minor? Simpler: keep as number, e.g., 1.0 -> 1.1 -> 1.2, etc. When exporting, increase by 0.1 and format as string.

**Example export function:**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const exportData = async (user, transactions, settings) => {
  let version = await AsyncStorage.getItem('exportVersion');
  if (!version) version = '1.0';
  // increment version (simple: split, increment decimal)
  const [major, minor] = version.split('.').map(Number);
  const newVersion = `${major}.${minor+1}`;
  await AsyncStorage.setItem('exportVersion', newVersion);

  const exportObj = {
    version: newVersion,
    exportedAt: new Date().toISOString(),
    appVersion: '1.0.0',
    user,
    transactions,
    settings,
  };
  const json = JSON.stringify(exportObj, null, 2);
  const path = FileSystem.documentDirectory + `export_v${newVersion}.json`;
  await FileSystem.writeAsStringAsync(path, json);
  await Sharing.shareAsync(path);
};
```

**Import function:**
- Use `DocumentPicker` to get file, read content, validate, then store each part using AsyncStorage.

---

## 8. Theme Handling (Nature & Dark Mode)

Define color palettes:

**Nature theme (light):**
- Background: #F5F5DC (beige)
- Primary: #4CAF50 (green)
- Text: #2C2C2C
- Card: #FFFFFF
- Border: #E0E0E0

**Dark theme:**
- Background: #121212
- Primary: #4CAF50
- Text: #EEEEEE
- Card: #1E1E1E
- Border: #333333

Use React Context to provide these colors and apply them via StyleSheet dynamically, or use `useMemo` to create styles based on theme.

---

## 9. Export/Import with Versioning

- Export version stored separately in AsyncStorage.
- Increment version on each export.
- Import: overwrite all data (user, transactions, settings). Also update export version to the imported version? The requirement says "version number also" included in exported JSON. When importing, we should keep the imported version as the current export version? Probably yes, to reflect that the data is now at that version. So after import, set `exportVersion` to the imported version. This ensures version continuity.

---

## 10. Additional Features

- **Mandatory remark:** enforce by checking `remark.trim().length > 0` before adding transaction.
- **Timestamp:** use `new Date().toLocaleString()` for human readable, and `Date.now()` for sorting.
- **Local storage:** all data persisted via AsyncStorage. We'll implement a `useEffect` in each context to save whenever state changes.

---

## 11. Styling Guidelines (StyleSheet, No Tailwind)

- Always use `StyleSheet.create` for performance and consistency.
- Avoid inline styles.
- Define reusable styles in separate files if needed, but per-screen is acceptable.
- For theme switching, create a hook `useTheme` that returns the color palette and use it to generate styles dynamically inside components using `useMemo`.

**Example:**
```javascript
const styles = useMemo(() => StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
  },
  text: {
    color: theme.text,
  },
}), [theme]);
```

---

## 12. Developer Info & Footer

Add an "About" section in SettingsScreen:

```javascript
<View style={styles.aboutContainer}>
  <Text style={styles.aboutText}>Developed by The NxT LvL aka Faizan</Text>
  <Text style={styles.aboutText}>Company: Hachi wa Studios</Text>
  <Text style={styles.aboutText}>Version: 1.0.0</Text>
  <Text style={styles.aboutText}>Instagram: is_anxt</Text>
  <Text style={styles.aboutText}>YouTube: @TheNxTLvL</Text>
</View>
```

---

## 13. Conclusion & Next Steps

This document outlines a complete React Native Expo application that meets all requirements. Claude will now implement the code following this specification.

All code must be written using **React Native's StyleSheet** (no Tailwind). The final app should be tested on both iOS and Android (Expo Go).
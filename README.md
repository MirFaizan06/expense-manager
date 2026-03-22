# Expense Manager

> A clean, private, and fully offline personal expense tracker built with React Native (Expo).
> Designed for daily use — track credits, debits, view reports, convert currencies, and backup your data.

**Developed by [The NxT LvL aka Faizan](https://www.instagram.com/is_anxt) | Hachi wa Studios**
**Version:** 1.0.0 | **Platform:** Android & iOS | **Framework:** React Native (Expo SDK 51)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Building an APK](#building-an-apk)
- [Assets & Design](#assets--design)
- [Supported Languages](#supported-languages)
- [Supported Currencies](#supported-currencies)
- [Data & Privacy](#data--privacy)
- [Developer](#developer)

---

## Overview

Expense Manager is a personal finance app built for everyday expense tracking.
It stores everything locally on your device — no account, no cloud, no subscriptions.

The app was designed with a warm nature-inspired theme (earthy beige + forest green) and
a full dark mode. It supports 5 languages and 50 currencies with a built-in live converter.

---

## Features

### Core
- **Login / Account** — Simple local authentication. First launch creates your account automatically.
- **Add Transactions** — Credit (income) or Debit (expense) with a mandatory remark, auto-timestamp.
- **Balance Dashboard** — Always-visible current balance, total credit, total debit at a glance.
- **Delete Transactions** — Swipe-to-confirm delete on any entry.

### Reports
- **Daily Reports** — Automatically grouped by date. Tap any day to expand transactions.
- **Net Summary** — Credit, debit, and net balance per day in a clean card layout.

### Currency Converter
- **50 Currencies** — INR, IDR, PHP, JPY, USD, EUR, GBP, CNY, KRW, AED, and 40 more.
- **Live Swap** — Tap the swap button to instantly reverse the conversion.
- **Quick Reference Grid** — Popular pairs (USD/INR, USD/JPY, etc.) always visible.
- **Approximate Rate Disclaimer** — Prominently shown — rates are static, not real-time.

### Customisation
- **Theme** — Nature mode (warm beige + green) or Dark mode. Persisted across sessions.
- **Currency Setting** — Choose your default currency for all new transactions.
- **Language** — Switch between English, Hindi, Japanese, Indonesian, and German instantly.

### Backup
- **Export** — Full data export (transactions + settings + account) as a versioned `.json` file.
- **Import** — Restore from a previous export. Includes overwrite confirmation.
- **Versioning** — Export files increment automatically: `1.0`, `1.1`, `1.2`, ...

---

## Screenshots

> Place screenshots in `public/screenshots/` after capturing on a device or emulator.
> See `assets/IMAGE_PROMPTS.md` for phone mockup tools.

| Home | Add Transaction | Reports |
|------|----------------|---------|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

| Currency Converter | Settings | Dark Mode |
|-------------------|----------|-----------|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~51.0.28 | Expo SDK & managed workflow |
| `react-native` | 0.74.5 | Core mobile framework |
| `@react-navigation/native` | ^6.1.17 | Navigation container |
| `@react-navigation/bottom-tabs` | ^6.5.20 | Bottom tab navigator |
| `@react-navigation/stack` | ^6.3.29 | Stack navigator (modal screens) |
| `@react-native-async-storage/async-storage` | 1.23.1 | Local data persistence |
| `@expo/vector-icons` | ^14.0.0 | Ionicons icon set |
| `expo-file-system` | ~17.0.1 | File read/write for export |
| `expo-sharing` | ~12.0.1 | Share exported JSON files |
| `expo-document-picker` | ~12.0.2 | Pick import JSON files |
| `expo-status-bar` | ~1.12.1 | Status bar styling |
| `react-native-safe-area-context` | 4.10.5 | Safe area insets |
| `react-native-screens` | 3.31.1 | Native screen optimization |
| `react-native-gesture-handler` | ~2.16.1 | Gesture support for navigation |

**State Management:** React Context API (5 contexts)
**Styling:** React Native `StyleSheet` + dynamic `useMemo` styles — no Tailwind

---

## Project Structure

```
Expense Manager/
├── App.js                          # Root — navigation + provider tree
├── app.json                        # Expo configuration
├── eas.json                        # EAS Build configuration
├── package.json
├── babel.config.js
│
├── assets/                         # App images (see assets/ASSETS_README.md)
│   ├── icon.png                    # 1024x1024 — App icon
│   ├── splash.png                  # 1284x2778 — Splash screen
│   ├── adaptive-icon.png           # 1024x1024 — Android adaptive icon
│   ├── favicon.png                 # 196x196 — Web favicon
│   ├── ASSETS_README.md            # Asset specs & checklist
│   └── IMAGE_PROMPTS.md            # AI prompts for generating all assets
│
├── public/                         # Marketing & store listing materials
│   ├── STORE_LISTING.md            # Play Store / App Store copy
│   └── screenshots/                # App screenshots (add after capture)
│
└── src/
    ├── constants/
    │   ├── currencies.js           # 50 currencies with symbols & USD rates
    │   ├── languages.js            # Translations: EN, HI, JA, ID, DE
    │   └── themes.js               # Nature & Dark theme color palettes
    │
    ├── context/
    │   ├── AuthContext.js          # Login state, first-time account creation
    │   ├── TransactionContext.js   # Transactions list, balance, add/delete
    │   ├── ThemeContext.js         # Dark/nature toggle, persisted
    │   ├── CurrencyContext.js      # Default currency, persisted
    │   └── LanguageContext.js      # Active language, t() translation fn
    │
    ├── utils/
    │   ├── scale.js                # Responsive sizing: scale, moderateScale, etc.
    │   ├── storage.js              # AsyncStorage helpers (em_ key prefix)
    │   ├── timestamp.js            # Human-readable local timestamps
    │   ├── reportGenerator.js      # Group transactions by date → daily reports
    │   ├── currencyConverter.js    # Convert between 50 currencies (USD base)
    │   └── exportImport.js         # Versioned JSON export + import via doc picker
    │
    ├── components/
    │   ├── TransactionItem.js      # Single transaction row with delete
    │   ├── CurrencySelector.js     # Searchable modal currency picker
    │   ├── ThemeToggle.js          # Dark/nature switch
    │   └── ReportCard.js           # Daily summary card (credit/debit/net)
    │
    └── screens/
        ├── LoginScreen.js          # Login / first-time account creation
        ├── HomeScreen.js           # Dashboard: balance, stats, recent transactions
        ├── TransactionScreen.js    # Add transaction form (modal)
        ├── ReportsScreen.js        # Daily reports with expandable detail sheet
        ├── CurrencyConverterScreen.js  # 50-currency converter + quick reference
        ├── SettingsScreen.js       # Theme, language, currency, about, export/import
        └── ExportImportScreen.js   # Export (share) & import (restore) data
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (or use `npx`)
- **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/expense-manager.git
cd expense-manager

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

Scan the QR code with Expo Go on your phone to run the app instantly.

---

## Running the App

```bash
# Start with Expo Go (recommended for testing)
npx expo start

# Run on Android emulator (requires Android Studio)
npx expo start --android

# Run on iOS simulator (requires Xcode — macOS only)
npx expo start --ios

# Run in web browser
npx expo start --web
```

---

## Building an APK

### Using EAS Build (Recommended — cloud build, no Android Studio needed)

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login to your Expo account (create free at expo.dev)
eas login

# 3. Link project (first time only)
eas build:configure

# 4. Build a preview APK (direct install, good for testing)
eas build -p android --profile preview

# 5. Build a production AAB (for Play Store)
eas build -p android --profile production
```

The build runs in Expo's cloud (~5–10 min). You will receive a download link when done.

### Using Local Build (requires Android Studio)

```bash
# Generate native android/ folder
npx expo prebuild --platform android

# Build debug APK
cd android && ./gradlew assembleDebug

# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Assets & Design

All image assets go in the `assets/` folder.

| File | Dimensions | Purpose |
|------|-----------|---------|
| `assets/icon.png` | 1024 x 1024 px | App icon |
| `assets/splash.png` | 1284 x 2778 px | Splash/loading screen |
| `assets/adaptive-icon.png` | 1024 x 1024 px | Android adaptive icon (transparent bg) |
| `assets/favicon.png` | 196 x 196 px | Web favicon |

**AI image generation prompts for all assets** are in `assets/IMAGE_PROMPTS.md`.

### Design Language
- **Primary color:** `#4CAF50` (Forest Green)
- **Light theme background:** `#F5F5DC` (Nature Beige)
- **Dark theme background:** `#121212`
- **Font:** System default (San Francisco on iOS, Roboto on Android)
- **Icons:** Ionicons via `@expo/vector-icons`

---

## Supported Languages

| Language | Code | Native Name |
|----------|------|------------|
| English | `en` | English |
| Hindi | `hi` | हिन्दी |
| Japanese | `ja` | 日本語 |
| Indonesian | `id` | Bahasa Indonesia |
| German | `de` | Deutsch |

Switch language instantly from **Settings → Language** — no restart required.

---

## Supported Currencies

The app supports **50 currencies** for both the default currency setting and the built-in converter.

Highlights include:

| Code | Currency | Symbol |
|------|----------|--------|
| INR | Indian Rupee | ₹ |
| IDR | Indonesian Rupiah | Rp |
| PHP | Philippine Peso | ₱ |
| JPY | Japanese Yen | ¥ |
| USD | US Dollar | $ |
| EUR | Euro | € |
| GBP | British Pound | £ |
| CNY | Chinese Yuan | ¥ |
| KRW | South Korean Won | ₩ |
| AED | UAE Dirham | AED |

...and 40 more (see `src/constants/currencies.js` for the full list).

> **Note:** Exchange rates in the currency converter are static/approximate and are not updated in real-time. The app clearly displays this disclaimer.

---

## Data & Privacy

- All data is stored locally on-device using `AsyncStorage`
- No data is sent to any server
- No analytics, no tracking, no ads
- AsyncStorage keys are prefixed with `em_` to avoid conflicts
- Full data export available as a versioned `.json` file
- Import restores data completely — no partial imports

### AsyncStorage Keys

| Key | Contents |
|-----|----------|
| `em_user` | Username and password |
| `em_transactions` | All transaction records |
| `em_settings` | Theme and currency preference |
| `em_exportVersion` | Current export version number |
| `em_language` | Selected language code |

---

## Developer

| | |
|---|---|
| **Developer** | The NxT LvL aka Faizan |
| **Company** | Hachi wa Studios |
| **Version** | 1.0.0 |
| **Instagram** | [@is_anxt](https://www.instagram.com/is_anxt) |
| **YouTube** | [@TheNxTLvL](https://www.youtube.com/@TheNxTLvL) |

---

## License

This project is proprietary software developed by Hachi wa Studios.
All rights reserved. Not licensed for redistribution or commercial use without permission.

---

*Built with React Native + Expo | Designed with a nature-inspired heart*

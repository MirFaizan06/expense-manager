import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: 'em_user',
  TRANSACTIONS: 'em_transactions',
  SETTINGS: 'em_settings',
  EXPORT_VERSION: 'em_exportVersion',
  LANGUAGE: 'em_language',
};

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('saveUser error:', e);
    throw e;
  }
};

export const loadUser = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('loadUser error:', e);
    return null;
  }
};

export const saveTransactions = async (transactions) => {
  try {
    await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (e) {
    console.error('saveTransactions error:', e);
    throw e;
  }
};

export const loadTransactions = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('loadTransactions error:', e);
    return [];
  }
};

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('saveSettings error:', e);
    throw e;
  }
};

export const loadSettings = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('loadSettings error:', e);
    return null;
  }
};

export const getExportVersion = async () => {
  const v = await AsyncStorage.getItem(KEYS.EXPORT_VERSION);
  return v || '1.0';
};

export const setExportVersion = async (version) => {
  await AsyncStorage.setItem(KEYS.EXPORT_VERSION, version);
};

export const restoreAll = async ({ user, transactions, settings, exportVersion }) => {
  try {
    const ops = [];
    if (user) ops.push([KEYS.USER, JSON.stringify(user)]);
    if (transactions) ops.push([KEYS.TRANSACTIONS, JSON.stringify(transactions)]);
    if (settings) ops.push([KEYS.SETTINGS, JSON.stringify(settings)]);
    if (exportVersion) ops.push([KEYS.EXPORT_VERSION, exportVersion]);
    if (ops.length > 0) {
      await AsyncStorage.multiSet(ops);
    }
  } catch (e) {
    console.error('restoreAll error:', e);
    throw e;
  }
};

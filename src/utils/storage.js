import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: 'em_user',
  TRANSACTIONS: 'em_transactions',
  SETTINGS: 'em_settings',
  EXPORT_VERSION: 'em_exportVersion',
  LANGUAGE: 'em_language',
};

export const saveUser = async (user) => {
  await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
};

export const loadUser = async () => {
  const raw = await AsyncStorage.getItem(KEYS.USER);
  return raw ? JSON.parse(raw) : null;
};

export const saveTransactions = async (transactions) => {
  await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const loadTransactions = async () => {
  const raw = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
  return raw ? JSON.parse(raw) : [];
};

export const saveSettings = async (settings) => {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

export const loadSettings = async () => {
  const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
  return raw ? JSON.parse(raw) : null;
};

export const getExportVersion = async () => {
  const v = await AsyncStorage.getItem(KEYS.EXPORT_VERSION);
  return v || '1.0';
};

export const setExportVersion = async (version) => {
  await AsyncStorage.setItem(KEYS.EXPORT_VERSION, version);
};

export const restoreAll = async ({ user, transactions, settings, exportVersion }) => {
  const ops = [];
  if (user) ops.push([KEYS.USER, JSON.stringify(user)]);
  if (transactions) ops.push([KEYS.TRANSACTIONS, JSON.stringify(transactions)]);
  if (settings) ops.push([KEYS.SETTINGS, JSON.stringify(settings)]);
  if (exportVersion) ops.push([KEYS.EXPORT_VERSION, exportVersion]);
  if (ops.length > 0) {
    await AsyncStorage.multiSet(ops);
  }
};

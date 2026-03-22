import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { getExportVersion, setExportVersion, restoreAll } from './storage';

const APP_VERSION = '1.0.0';

const incrementVersion = (version) => {
  const parts = version.split('.');
  const major = parseInt(parts[0], 10) || 1;
  const minor = parseInt(parts[1], 10) || 0;
  const newMinor = minor + 1;
  if (newMinor >= 10) {
    return `${major + 1}.0`;
  }
  return `${major}.${newMinor}`;
};

export const exportData = async (user, transactions, settings) => {
  const currentVersion = await getExportVersion();
  const newVersion = incrementVersion(currentVersion);
  await setExportVersion(newVersion);

  const exportObj = {
    version: newVersion,
    exportedAt: new Date().toISOString(),
    appVersion: APP_VERSION,
    user,
    transactions,
    settings,
  };

  const json = JSON.stringify(exportObj, null, 2);
  const fileName = `expense_export_v${newVersion}.json`;
  const path = FileSystem.documentDirectory + fileName;

  await FileSystem.writeAsStringAsync(path, json, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(path, {
      mimeType: 'application/json',
      dialogTitle: 'Export Expense Data',
    });
  }

  return newVersion;
};

export const importData = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/json', 'text/plain', '*/*'],
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;

  const asset = result.assets[0];
  const content = await FileSystem.readAsStringAsync(asset.uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('Invalid JSON file');
  }

  if (!parsed.version || !Array.isArray(parsed.transactions) || !parsed.user) {
    throw new Error('Invalid export file format');
  }

  await restoreAll({
    user: parsed.user,
    transactions: parsed.transactions,
    settings: parsed.settings || {},
    exportVersion: parsed.version,
  });

  return parsed;
};

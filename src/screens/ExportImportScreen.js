import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTransaction } from '../context/TransactionContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { exportData, importData } from '../utils/exportImport';
import { loadSettings, getExportVersion } from '../utils/storage';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

export default function ExportImportScreen({ navigation }) {
  const { user, restoreUser } = useAuth();
  const { transactions, restoreTransactions } = useTransaction();
  const { currencyCode, applyCurrency } = useCurrency();
  const { applyTheme, colors } = useTheme();
  const { t, langCode, changeLanguage } = useLanguage();

  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [lastExportVersion, setLastExportVersion] = useState(null);

  useEffect(() => {
    getExportVersion().then((v) => {
      const minor = parseInt(v.split('.')[1], 10);
      if (minor > 0) setLastExportVersion(v);
    });
  }, []);

  const handleExport = async () => {
    setExporting(true);
    try {
      const saved = (await loadSettings()) || {};
      const settings = {
        currency: saved.currency || currencyCode,
        theme: saved.theme || 'nature',
        language: langCode,
      };
      const version = await exportData(user, transactions, settings);
      setLastExportVersion(version);
      Alert.alert(t('success'), `${t('export_success')}\nVersion: ${version}`);
    } catch (e) {
      Alert.alert(t('error'), t('export_error'));
    } finally {
      setExporting(false);
    }
  };

  const handleImport = () => {
    Alert.alert(t('import_warning'), t('import_confirm'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('confirm'),
        style: 'destructive',
        onPress: async () => {
          setImporting(true);
          try {
            const parsed = await importData();
            if (!parsed) {
              setImporting(false);
              return;
            }
            restoreTransactions(parsed.transactions || []);
            if (parsed.user) restoreUser(parsed.user);
            if (parsed.settings) {
              if (parsed.settings.currency) applyCurrency(parsed.settings.currency);
              if (parsed.settings.theme) applyTheme(parsed.settings.theme);
              if (parsed.settings.language) await changeLanguage(parsed.settings.language);
            }
            Alert.alert(t('success'), t('import_success'));
          } catch (e) {
            Alert.alert(t('error'), e.message || t('import_error'));
          } finally {
            setImporting(false);
          }
        },
      },
    ]);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(14),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.card,
        },
        backBtn: {
          padding: scale(4),
          marginRight: scale(12),
        },
        headerTitle: {
          fontSize: fontScale(18),
          fontWeight: '700',
          color: colors.text,
        },
        scroll: {
          flex: 1,
          padding: scale(16),
        },
        infoCard: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(16),
          padding: moderateScale(16),
          marginBottom: verticalScale(16),
          borderWidth: 1,
          borderColor: colors.border,
        },
        infoTitle: {
          fontSize: fontScale(13),
          fontWeight: '600',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: verticalScale(12),
        },
        infoRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: verticalScale(6),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        infoRowLast: {
          borderBottomWidth: 0,
        },
        infoLabel: {
          fontSize: fontScale(14),
          color: colors.textSecondary,
        },
        infoValue: {
          fontSize: fontScale(14),
          fontWeight: '600',
          color: colors.text,
        },
        actionCard: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(16),
          padding: moderateScale(16),
          marginBottom: verticalScale(14),
          borderWidth: 1,
          borderColor: colors.border,
        },
        actionTitle: {
          fontSize: fontScale(16),
          fontWeight: '700',
          color: colors.text,
          marginBottom: verticalScale(6),
        },
        actionDesc: {
          fontSize: fontScale(13),
          color: colors.textSecondary,
          lineHeight: fontScale(20),
          marginBottom: verticalScale(14),
        },
        actionBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: moderateScale(12),
          paddingVertical: verticalScale(13),
        },
        exportBtn: {
          backgroundColor: colors.primary,
        },
        importBtn: {
          backgroundColor: colors.accent,
        },
        actionBtnText: {
          color: '#FFFFFF',
          fontSize: fontScale(15),
          fontWeight: '700',
          marginLeft: scale(8),
        },
        warningBox: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: colors.debitBg,
          borderRadius: moderateScale(12),
          padding: moderateScale(14),
          marginBottom: verticalScale(20),
          borderWidth: 1,
          borderColor: colors.debit + '44',
        },
        warningText: {
          fontSize: fontScale(13),
          color: colors.debit,
          marginLeft: scale(8),
          flex: 1,
          lineHeight: fontScale(20),
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={moderateScale(24)} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('export_import')}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Current Data</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('total_transactions')}</Text>
            <Text style={styles.infoValue}>{transactions.length}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('export_version')}</Text>
            <Text style={styles.infoValue}>
              {lastExportVersion || 'Not exported yet'}
            </Text>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <Text style={styles.infoLabel}>Account</Text>
            <Text style={styles.infoValue}>{user?.username || '-'}</Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>{t('export_data')}</Text>
          <Text style={styles.actionDesc}>
            Save all your transactions, settings, and account data as a JSON file. You can share it or store it as a backup.
          </Text>
          <TouchableOpacity
            style={[styles.actionBtn, styles.exportBtn]}
            onPress={handleExport}
            disabled={exporting}
            activeOpacity={0.85}
          >
            {exporting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Ionicons name="share-outline" size={moderateScale(20)} color="#FFFFFF" />
            )}
            <Text style={styles.actionBtnText}>
              {exporting ? 'Exporting...' : t('export_data')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.warningBox}>
          <Ionicons name="warning-outline" size={moderateScale(18)} color={colors.debit} />
          <Text style={styles.warningText}>{t('import_warning')}</Text>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>{t('import_data')}</Text>
          <Text style={styles.actionDesc}>
            Restore data from a previously exported JSON file. This will replace all current data.
          </Text>
          <TouchableOpacity
            style={[styles.actionBtn, styles.importBtn]}
            onPress={handleImport}
            disabled={importing}
            activeOpacity={0.85}
          >
            {importing ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Ionicons name="download-outline" size={moderateScale(20)} color="#FFFFFF" />
            )}
            <Text style={styles.actionBtnText}>
              {importing ? 'Importing...' : t('import_data')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: verticalScale(30) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

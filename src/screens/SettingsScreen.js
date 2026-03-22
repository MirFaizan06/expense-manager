import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import ThemeToggle from '../components/ThemeToggle';
import CurrencySelector from '../components/CurrencySelector';
import { LANGUAGE_LIST } from '../constants/languages';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

const DEVELOPER = {
  name: 'The NxT LvL aka Faizan',
  company: 'Hachi wa Studios',
  version: '1.0.0',
  instagram: '@is_anxt',
  youtube: '@TheNxTLvL',
};

function SettingRow({ icon, iconBg, label, value, onPress, last }) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(14),
          paddingVertical: verticalScale(13),
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: colors.border,
        },
        iconBox: {
          width: moderateScale(36),
          height: moderateScale(36),
          borderRadius: moderateScale(10),
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: scale(12),
          backgroundColor: iconBg,
        },
        label: {
          flex: 1,
          fontSize: fontScale(15),
          color: colors.text,
          fontWeight: '500',
        },
        value: {
          fontSize: fontScale(13),
          color: colors.textSecondary,
          marginRight: scale(6),
        },
      }),
    [colors, last, iconBg]
  );

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={moderateScale(18)} color="#FFFFFF" />
      </View>
      <Text style={styles.label}>{label}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      {onPress && (
        <Ionicons name="chevron-forward" size={moderateScale(16)} color={colors.textLight} />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const { t, langCode, changeLanguage } = useLanguage();
  const { currencyCode, changeCurrency } = useCurrency();

  const handleLogout = () => {
    Alert.alert(t('logout'), 'Are you sure you want to logout?', [
      { text: t('cancel'), style: 'cancel' },
      { text: t('logout'), style: 'destructive', onPress: logout },
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
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(14),
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitle: {
          fontSize: fontScale(22),
          fontWeight: '800',
          color: colors.text,
          letterSpacing: -0.5,
        },
        scroll: {
          flex: 1,
          padding: scale(16),
        },
        profileCard: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(20),
          padding: moderateScale(18),
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: verticalScale(20),
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        },
        avatarCircle: {
          width: moderateScale(56),
          height: moderateScale(56),
          borderRadius: moderateScale(28),
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: scale(14),
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.35,
          shadowRadius: 6,
          elevation: 5,
        },
        avatarLetter: {
          fontSize: fontScale(24),
          fontWeight: '900',
          color: '#FFFFFF',
        },
        profileName: {
          fontSize: fontScale(18),
          fontWeight: '800',
          color: colors.text,
          letterSpacing: -0.3,
        },
        profileSub: {
          fontSize: fontScale(12),
          color: colors.textSecondary,
          marginTop: verticalScale(2),
        },
        sectionLabel: {
          fontSize: fontScale(11),
          fontWeight: '700',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 1.1,
          marginBottom: verticalScale(8),
          paddingLeft: scale(2),
        },
        card: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(18),
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          marginBottom: verticalScale(20),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 2,
        },
        innerPad: {
          padding: scale(14),
        },
        langGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: scale(12),
          gap: scale(8),
        },
        langPill: {
          paddingHorizontal: scale(14),
          paddingVertical: verticalScale(8),
          borderRadius: moderateScale(22),
          borderWidth: 1.5,
          borderColor: colors.border,
          backgroundColor: colors.inputBg,
        },
        langPillActive: {
          borderColor: colors.primary,
          backgroundColor: colors.creditBg,
        },
        langPillText: {
          fontSize: fontScale(13),
          color: colors.textSecondary,
          fontWeight: '600',
        },
        langPillTextActive: {
          color: colors.primary,
          fontWeight: '800',
        },
        aboutInfoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(12),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        aboutInfoRowLast: {
          borderBottomWidth: 0,
        },
        aboutKey: {
          fontSize: fontScale(13),
          color: colors.textSecondary,
          width: scale(88),
          fontWeight: '500',
        },
        aboutVal: {
          fontSize: fontScale(14),
          color: colors.text,
          fontWeight: '700',
          flex: 1,
        },
        exportBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.card,
          borderRadius: moderateScale(18),
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(15),
          marginBottom: verticalScale(20),
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 2,
        },
        exportBtnLeft: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        exportIconBox: {
          width: moderateScale(36),
          height: moderateScale(36),
          borderRadius: moderateScale(10),
          backgroundColor: colors.accent,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: scale(12),
        },
        exportBtnLabel: {
          fontSize: fontScale(15),
          fontWeight: '700',
          color: colors.text,
        },
        exportBtnSub: {
          fontSize: fontScale(12),
          color: colors.textSecondary,
        },
        logoutBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.debitBg,
          borderRadius: moderateScale(16),
          paddingVertical: verticalScale(15),
          marginBottom: verticalScale(30),
          borderWidth: 1.5,
          borderColor: colors.debit + '55',
        },
        logoutBtnText: {
          fontSize: fontScale(15),
          fontWeight: '800',
          color: colors.debit,
          marginLeft: scale(8),
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings_title')}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>
              {(user?.username?.[0] || 'U').toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.profileName}>{user?.username || 'User'}</Text>
            <Text style={styles.profileSub}>Expense Manager Account</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>{t('appearance')}</Text>
        <View style={styles.card}>
          <View style={styles.innerPad}>
            <ThemeToggle />
          </View>
        </View>

        <Text style={styles.sectionLabel}>{t('language')}</Text>
        <View style={styles.card}>
          <View style={styles.langGrid}>
            {LANGUAGE_LIST.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langPill, langCode === lang.code && styles.langPillActive]}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text
                  style={[
                    styles.langPillText,
                    langCode === lang.code && styles.langPillTextActive,
                  ]}
                >
                  {lang.nativeName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionLabel}>{t('currency')}</Text>
        <View style={styles.card}>
          <View style={styles.innerPad}>
            <CurrencySelector value={currencyCode} onChange={changeCurrency} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.exportBtn}
          onPress={() => navigation.navigate('ExportImport')}
          activeOpacity={0.8}
        >
          <View style={styles.exportBtnLeft}>
            <View style={styles.exportIconBox}>
              <Ionicons name="swap-horizontal" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.exportBtnLabel}>{t('export_import')}</Text>
              <Text style={styles.exportBtnSub}>Backup & restore data</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={moderateScale(18)} color={colors.textLight} />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>{t('about')}</Text>
        <View style={styles.card}>
          {[
            { key: t('developer'), val: DEVELOPER.name },
            { key: t('company'), val: DEVELOPER.company },
            { key: t('version'), val: DEVELOPER.version },
            { key: t('instagram'), val: DEVELOPER.instagram },
            { key: t('youtube'), val: DEVELOPER.youtube },
          ].map((item, i, arr) => (
            <View
              key={item.key}
              style={[styles.aboutInfoRow, i === arr.length - 1 && styles.aboutInfoRowLast]}
            >
              <Text style={styles.aboutKey}>{item.key}</Text>
              <Text style={styles.aboutVal}>{item.val}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={moderateScale(20)} color={colors.debit} />
          <Text style={styles.logoutBtnText}>{t('logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

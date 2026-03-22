import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTransaction } from '../context/TransactionContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import TransactionItem from '../components/TransactionItem';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

export default function HomeScreen({ navigation }) {
  const { transactions, balance, totalCredit, totalDebit, recentTransactions } = useTransaction();
  const { currency } = useCurrency();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();

  const isPositive = balance >= 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: colors.background,
        },
        scroll: {
          flex: 1,
        },
        heroBanner: {
          backgroundColor: colors.primary,
          paddingHorizontal: scale(20),
          paddingTop: verticalScale(14),
          paddingBottom: verticalScale(70),
        },
        bannerTop: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: verticalScale(4),
        },
        greetLine: {
          fontSize: fontScale(13),
          color: 'rgba(255,255,255,0.75)',
          fontWeight: '500',
        },
        userLine: {
          fontSize: fontScale(20),
          fontWeight: '800',
          color: '#FFFFFF',
          letterSpacing: -0.5,
        },
        avatarBtn: {
          width: moderateScale(44),
          height: moderateScale(44),
          borderRadius: moderateScale(22),
          backgroundColor: 'rgba(255,255,255,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: 'rgba(255,255,255,0.3)',
        },
        balanceFloat: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(22),
          marginHorizontal: scale(14),
          marginTop: -verticalScale(48),
          padding: moderateScale(22),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: colors.isDark ? 0.4 : 0.12,
          shadowRadius: 20,
          elevation: 10,
          borderWidth: 1,
          borderColor: colors.border,
        },
        balanceChip: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: isPositive ? colors.creditBg : colors.debitBg,
          paddingHorizontal: scale(12),
          paddingVertical: verticalScale(4),
          borderRadius: moderateScale(20),
          marginBottom: verticalScale(10),
        },
        balanceChipText: {
          fontSize: fontScale(11),
          fontWeight: '700',
          color: isPositive ? colors.credit : colors.debit,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          marginLeft: scale(4),
        },
        balanceAmount: {
          fontSize: fontScale(42),
          fontWeight: '900',
          color: colors.text,
          textAlign: 'center',
          letterSpacing: -2,
          lineHeight: fontScale(50),
        },
        balanceCurrency: {
          fontSize: fontScale(20),
          fontWeight: '600',
          color: colors.textSecondary,
        },
        balanceDivider: {
          height: 1,
          backgroundColor: colors.border,
          marginVertical: verticalScale(16),
        },
        statsRow: {
          flexDirection: 'row',
        },
        statBox: {
          flex: 1,
          alignItems: 'center',
          paddingVertical: verticalScale(8),
          borderRadius: moderateScale(12),
        },
        statIcon: {
          width: moderateScale(36),
          height: moderateScale(36),
          borderRadius: moderateScale(18),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: verticalScale(6),
        },
        statLabel: {
          fontSize: fontScale(11),
          color: colors.textSecondary,
          marginBottom: verticalScale(3),
          fontWeight: '500',
        },
        statCreditVal: {
          fontSize: fontScale(15),
          fontWeight: '800',
          color: colors.credit,
        },
        statDebitVal: {
          fontSize: fontScale(15),
          fontWeight: '800',
          color: colors.debit,
        },
        statDivider: {
          width: 1,
          backgroundColor: colors.border,
          marginHorizontal: scale(4),
        },
        section: {
          paddingHorizontal: scale(16),
          marginTop: verticalScale(22),
        },
        sectionRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: verticalScale(12),
        },
        sectionTitle: {
          fontSize: fontScale(17),
          fontWeight: '800',
          color: colors.text,
          letterSpacing: -0.3,
        },
        viewAllBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.creditBg,
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(5),
          borderRadius: moderateScale(12),
        },
        viewAllText: {
          fontSize: fontScale(12),
          color: colors.primary,
          fontWeight: '700',
          marginRight: scale(2),
        },
        emptyCard: {
          alignItems: 'center',
          paddingVertical: verticalScale(36),
          backgroundColor: colors.card,
          borderRadius: moderateScale(18),
          borderWidth: 1.5,
          borderColor: colors.border,
          borderStyle: 'dashed',
        },
        emptyText: {
          fontSize: fontScale(14),
          color: colors.textSecondary,
          textAlign: 'center',
          marginTop: verticalScale(12),
          lineHeight: fontScale(22),
        },
        emptyAddBtn: {
          marginTop: verticalScale(14),
          backgroundColor: colors.primary,
          paddingHorizontal: scale(20),
          paddingVertical: verticalScale(10),
          borderRadius: moderateScale(20),
          flexDirection: 'row',
          alignItems: 'center',
        },
        emptyAddText: {
          color: '#FFFFFF',
          fontWeight: '700',
          fontSize: fontScale(14),
          marginLeft: scale(6),
        },
        fab: {
          position: 'absolute',
          bottom: verticalScale(22),
          right: scale(20),
          backgroundColor: colors.primary,
          width: moderateScale(60),
          height: moderateScale(60),
          borderRadius: moderateScale(30),
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.5,
          shadowRadius: 14,
          elevation: 12,
          borderWidth: 3,
          borderColor: 'rgba(255,255,255,0.25)',
        },
      }),
    [colors, isPositive]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <View style={styles.bannerTop}>
            <View>
              <Text style={styles.greetLine}>{t('home')}</Text>
              <Text style={styles.userLine}>{user?.username || 'User'}</Text>
            </View>
            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="person-outline" size={moderateScale(20)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceFloat}>
          <View style={styles.balanceChip}>
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={moderateScale(12)}
              color={isPositive ? colors.credit : colors.debit}
            />
            <Text style={styles.balanceChipText}>{t('current_balance')}</Text>
          </View>

          <Text style={styles.balanceAmount}>
            <Text style={styles.balanceCurrency}>{currency.symbol}</Text>
            {Math.abs(balance).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>

          <View style={styles.balanceDivider} />

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={[styles.statIcon, { backgroundColor: colors.creditBg }]}>
                <Ionicons name="arrow-down-circle" size={moderateScale(18)} color={colors.credit} />
              </View>
              <Text style={styles.statLabel}>{t('total_credit')}</Text>
              <Text style={styles.statCreditVal}>
                {currency.symbol}{totalCredit.toFixed(2)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <View style={[styles.statIcon, { backgroundColor: colors.debitBg }]}>
                <Ionicons name="arrow-up-circle" size={moderateScale(18)} color={colors.debit} />
              </View>
              <Text style={styles.statLabel}>{t('total_debit')}</Text>
              <Text style={styles.statDebitVal}>
                {currency.symbol}{totalDebit.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>{t('recent_transactions')}</Text>
            {recentTransactions.length > 0 && (
              <TouchableOpacity
                style={styles.viewAllBtn}
                onPress={() => navigation.navigate('Reports')}
              >
                <Text style={styles.viewAllText}>{t('view_all')}</Text>
                <Ionicons name="chevron-forward" size={moderateScale(13)} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          {recentTransactions.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons
                name="receipt-outline"
                size={moderateScale(44)}
                color={colors.textLight}
              />
              <Text style={styles.emptyText}>{t('no_transactions')}</Text>
              <TouchableOpacity
                style={styles.emptyAddBtn}
                onPress={() => navigation.navigate('AddTransaction')}
              >
                <Ionicons name="add" size={moderateScale(16)} color="#FFFFFF" />
                <Text style={styles.emptyAddText}>{t('add_transaction')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            recentTransactions.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))
          )}
        </View>

        <View style={{ height: verticalScale(100) }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={moderateScale(32)} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

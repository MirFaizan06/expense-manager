import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

export default function ReportCard({ report, onPress }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { currency } = useCurrency();

  const net = report.totalCredit - report.totalDebit;
  const isPositive = net >= 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(14),
          padding: moderateScale(16),
          marginVertical: verticalScale(5),
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: verticalScale(10),
        },
        date: {
          fontSize: fontScale(14),
          fontWeight: '700',
          color: colors.text,
          flex: 1,
        },
        txCount: {
          fontSize: fontScale(12),
          color: colors.textSecondary,
          backgroundColor: colors.background,
          paddingHorizontal: scale(8),
          paddingVertical: verticalScale(3),
          borderRadius: moderateScale(10),
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: verticalScale(6),
        },
        col: {
          flex: 1,
          alignItems: 'center',
          paddingVertical: verticalScale(6),
          borderRadius: moderateScale(8),
        },
        colLabel: {
          fontSize: fontScale(10),
          color: colors.textSecondary,
          marginBottom: verticalScale(3),
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        credit: {
          fontSize: fontScale(14),
          fontWeight: '700',
          color: colors.credit,
        },
        debit: {
          fontSize: fontScale(14),
          fontWeight: '700',
          color: colors.debit,
        },
        net: {
          fontSize: fontScale(14),
          fontWeight: '700',
          color: isPositive ? colors.credit : colors.debit,
        },
        divider: {
          width: 1,
          backgroundColor: colors.border,
          marginHorizontal: scale(4),
        },
        chevron: {
          position: 'absolute',
          bottom: moderateScale(14),
          right: moderateScale(14),
        },
      }),
    [colors, isPositive]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.header}>
        <Text style={styles.date}>{report.date}</Text>
        <Text style={styles.txCount}>
          {report.transactions.length} {t('transactions')}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.colLabel}>{t('total_credit')}</Text>
          <Text style={styles.credit}>
            {currency.symbol}
            {report.totalCredit.toFixed(2)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.col}>
          <Text style={styles.colLabel}>{t('total_debit')}</Text>
          <Text style={styles.debit}>
            {currency.symbol}
            {report.totalDebit.toFixed(2)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.col}>
          <Text style={styles.colLabel}>{t('net_balance')}</Text>
          <Text style={styles.net}>
            {isPositive ? '+' : ''}
            {currency.symbol}
            {net.toFixed(2)}
          </Text>
        </View>
      </View>
      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={moderateScale(14)}
          color={colors.textLight}
          style={styles.chevron}
        />
      )}
    </TouchableOpacity>
  );
}

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTransaction } from '../context/TransactionContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import ReportCard from '../components/ReportCard';
import TransactionItem from '../components/TransactionItem';
import { generateDailyReports } from '../utils/reportGenerator';
import { moderateScale, scale, verticalScale, fontScale, SCREEN_HEIGHT } from '../utils/scale';

export default function ReportsScreen() {
  const { transactions, balance, totalCredit, totalDebit } = useTransaction();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { currency } = useCurrency();
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = useMemo(() => generateDailyReports(transactions), [transactions]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          paddingHorizontal: scale(16),
          paddingTop: verticalScale(14),
          paddingBottom: verticalScale(14),
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTop: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        headerTitle: {
          fontSize: fontScale(22),
          fontWeight: '800',
          color: colors.text,
          letterSpacing: -0.5,
        },
        daysBadge: {
          backgroundColor: colors.creditBg,
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(4),
          borderRadius: moderateScale(12),
        },
        daysBadgeText: {
          fontSize: fontScale(12),
          fontWeight: '700',
          color: colors.primary,
        },
        summaryStrip: {
          flexDirection: 'row',
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(12),
          gap: scale(10),
        },
        stripCard: {
          flex: 1,
          backgroundColor: colors.card,
          borderRadius: moderateScale(14),
          padding: moderateScale(12),
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        },
        stripLabel: {
          fontSize: fontScale(10),
          color: colors.textSecondary,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: verticalScale(4),
        },
        stripCreditVal: {
          fontSize: fontScale(14),
          fontWeight: '800',
          color: colors.credit,
        },
        stripDebitVal: {
          fontSize: fontScale(14),
          fontWeight: '800',
          color: colors.debit,
        },
        stripBalVal: {
          fontSize: fontScale(14),
          fontWeight: '800',
          color: balance >= 0 ? colors.credit : colors.debit,
        },
        list: {
          padding: scale(14),
        },
        emptyWrap: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: scale(32),
          paddingTop: verticalScale(80),
        },
        emptyTitle: {
          fontSize: fontScale(18),
          fontWeight: '800',
          color: colors.text,
          marginTop: verticalScale(14),
          marginBottom: verticalScale(6),
        },
        emptyText: {
          fontSize: fontScale(14),
          color: colors.textSecondary,
          textAlign: 'center',
          lineHeight: fontScale(22),
        },
        sheetOverlay: {
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: 'flex-end',
        },
        sheet: {
          backgroundColor: colors.surface,
          borderTopLeftRadius: moderateScale(28),
          borderTopRightRadius: moderateScale(28),
          maxHeight: SCREEN_HEIGHT * 0.85,
          overflow: 'hidden',
        },
        sheetHandle: {
          width: scale(36),
          height: verticalScale(4),
          backgroundColor: colors.border,
          borderRadius: moderateScale(2),
          alignSelf: 'center',
          marginTop: verticalScale(12),
        },
        sheetHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: scale(18),
          paddingVertical: verticalScale(14),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        sheetDate: {
          fontSize: fontScale(17),
          fontWeight: '800',
          color: colors.text,
          letterSpacing: -0.3,
        },
        sheetClose: {
          width: moderateScale(34),
          height: moderateScale(34),
          borderRadius: moderateScale(17),
          backgroundColor: colors.inputBg,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        },
        sheetSummary: {
          flexDirection: 'row',
          paddingHorizontal: scale(14),
          paddingVertical: verticalScale(14),
          gap: scale(10),
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        summaryCol: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors.background,
          borderRadius: moderateScale(12),
          paddingVertical: verticalScale(10),
          borderWidth: 1,
          borderColor: colors.border,
        },
        summaryColLabel: {
          fontSize: fontScale(10),
          color: colors.textSecondary,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: verticalScale(3),
        },
        summaryColCredit: {
          fontSize: fontScale(15),
          fontWeight: '800',
          color: colors.credit,
        },
        summaryColDebit: {
          fontSize: fontScale(15),
          fontWeight: '800',
          color: colors.debit,
        },
        summaryColNet: {
          fontSize: fontScale(15),
          fontWeight: '800',
        },
        txSectionLabel: {
          fontSize: fontScale(12),
          fontWeight: '700',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: verticalScale(8),
          marginTop: verticalScale(2),
          paddingHorizontal: scale(14),
        },
        sheetScroll: {
          paddingHorizontal: scale(10),
          paddingTop: verticalScale(10),
        },
      }),
    [colors, balance]
  );

  const selectedNet = selectedReport
    ? selectedReport.totalCredit - selectedReport.totalDebit
    : 0;
  const selectedNetPositive = selectedNet >= 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>{t('reports_title')}</Text>
          {reports.length > 0 && (
            <View style={styles.daysBadge}>
              <Text style={styles.daysBadgeText}>{reports.length} days</Text>
            </View>
          )}
        </View>
      </View>

      {transactions.length > 0 && (
        <View style={styles.summaryStrip}>
          <View style={styles.stripCard}>
            <Text style={styles.stripLabel}>{t('total_credit')}</Text>
            <Text style={styles.stripCreditVal}>{currency.symbol}{totalCredit.toFixed(0)}</Text>
          </View>
          <View style={styles.stripCard}>
            <Text style={styles.stripLabel}>{t('total_debit')}</Text>
            <Text style={styles.stripDebitVal}>{currency.symbol}{totalDebit.toFixed(0)}</Text>
          </View>
          <View style={styles.stripCard}>
            <Text style={styles.stripLabel}>{t('net_balance')}</Text>
            <Text style={styles.stripBalVal}>{currency.symbol}{Math.abs(balance).toFixed(0)}</Text>
          </View>
        </View>
      )}

      {reports.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="bar-chart-outline" size={moderateScale(60)} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No Reports Yet</Text>
          <Text style={styles.emptyText}>{t('no_reports')}</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <ReportCard report={item} onPress={() => setSelectedReport(item)} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        visible={!!selectedReport}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedReport(null)}
      >
        <View style={styles.sheetOverlay}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetDate}>{selectedReport?.date}</Text>
              <TouchableOpacity
                style={styles.sheetClose}
                onPress={() => setSelectedReport(null)}
              >
                <Ionicons name="close" size={moderateScale(18)} color={colors.text} />
              </TouchableOpacity>
            </View>

            {selectedReport && (
              <>
                <View style={styles.sheetSummary}>
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryColLabel}>{t('total_credit')}</Text>
                    <Text style={styles.summaryColCredit}>
                      {currency.symbol}{selectedReport.totalCredit.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryColLabel}>{t('total_debit')}</Text>
                    <Text style={styles.summaryColDebit}>
                      {currency.symbol}{selectedReport.totalDebit.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryColLabel}>{t('net_balance')}</Text>
                    <Text
                      style={[
                        styles.summaryColNet,
                        { color: selectedNetPositive ? colors.credit : colors.debit },
                      ]}
                    >
                      {selectedNetPositive ? '+' : ''}
                      {currency.symbol}{selectedNet.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.txSectionLabel}>{t('transactions_cap')}</Text>
                  <View style={styles.sheetScroll}>
                    {[...selectedReport.transactions]
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .map((tx) => (
                        <TransactionItem key={tx.id} transaction={tx} />
                      ))}
                    <View style={{ height: verticalScale(40) }} />
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

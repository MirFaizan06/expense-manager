import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';
import { convertCurrency, getExchangeRate, formatConverted } from '../utils/currencyConverter';
import { getCurrencyByCode } from '../constants/currencies';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

const POPULAR_PAIRS = [
  ['USD', 'INR'],
  ['USD', 'IDR'],
  ['USD', 'PHP'],
  ['USD', 'JPY'],
  ['EUR', 'USD'],
  ['GBP', 'USD'],
  ['USD', 'CNY'],
  ['USD', 'AUD'],
];

export default function CurrencyConverterScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { currency: defaultCurrency } = useCurrency();

  const [amount, setAmount] = useState('1');
  const [fromCode, setFromCode] = useState(defaultCurrency.code);
  const [toCode, setToCode] = useState('USD');

  const fromCurrency = useMemo(() => getCurrencyByCode(fromCode), [fromCode]);
  const toCurrency = useMemo(() => getCurrencyByCode(toCode), [toCode]);

  const converted = useMemo(() => {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 0) return null;
    return convertCurrency(num, fromCode, toCode);
  }, [amount, fromCode, toCode]);

  const exchangeRate = useMemo(() => getExchangeRate(fromCode, toCode), [fromCode, toCode]);

  const swapCurrencies = useCallback(() => {
    setFromCode(toCode);
    setToCode(fromCode);
  }, [fromCode, toCode]);

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
          paddingBottom: verticalScale(12),
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
        approxBanner: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFF3E0',
          borderRadius: moderateScale(10),
          paddingHorizontal: scale(12),
          paddingVertical: verticalScale(8),
          marginTop: verticalScale(8),
          borderWidth: 1,
          borderColor: '#FFB74D',
        },
        approxBannerDark: {
          backgroundColor: '#3A2D1A',
          borderColor: '#FF9800',
        },
        approxIcon: {
          marginRight: scale(6),
        },
        approxText: {
          fontSize: fontScale(12),
          color: '#E65100',
          fontWeight: '700',
          flex: 1,
          lineHeight: fontScale(17),
        },
        approxTextDark: {
          color: '#FFB74D',
        },
        scroll: {
          flex: 1,
          padding: scale(14),
        },
        converterCard: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(22),
          padding: moderateScale(20),
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: colors.isDark ? 0.35 : 0.1,
          shadowRadius: 16,
          elevation: 6,
          marginBottom: verticalScale(14),
        },
        amountSection: {
          marginBottom: verticalScale(16),
        },
        amountLabel: {
          fontSize: fontScale(11),
          fontWeight: '700',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: verticalScale(8),
        },
        amountInputRow: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: colors.primary,
          borderRadius: moderateScale(14),
          backgroundColor: colors.inputBg,
          paddingHorizontal: scale(14),
        },
        amountSymbol: {
          fontSize: fontScale(22),
          fontWeight: '900',
          color: colors.primary,
          marginRight: scale(6),
        },
        amountInput: {
          flex: 1,
          fontSize: fontScale(26),
          fontWeight: '800',
          color: colors.text,
          paddingVertical: verticalScale(12),
          letterSpacing: -0.5,
        },
        swapSection: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: verticalScale(14),
        },
        swapLine: {
          flex: 1,
          height: 1,
          backgroundColor: colors.border,
        },
        swapCircle: {
          width: moderateScale(44),
          height: moderateScale(44),
          borderRadius: moderateScale(22),
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: scale(14),
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
        },
        selectorWrap: {
          marginBottom: verticalScale(12),
        },
        resultBubble: {
          backgroundColor: colors.primary,
          borderRadius: moderateScale(16),
          padding: moderateScale(18),
          alignItems: 'center',
          marginTop: verticalScale(4),
        },
        resultTag: {
          fontSize: fontScale(11),
          fontWeight: '700',
          color: 'rgba(255,255,255,0.7)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: verticalScale(6),
        },
        resultRow: {
          flexDirection: 'row',
          alignItems: 'baseline',
        },
        resultSymbol: {
          fontSize: fontScale(22),
          fontWeight: '700',
          color: 'rgba(255,255,255,0.85)',
          marginRight: scale(4),
        },
        resultValue: {
          fontSize: fontScale(36),
          fontWeight: '900',
          color: '#FFFFFF',
          letterSpacing: -1.5,
        },
        resultCurrencyName: {
          fontSize: fontScale(13),
          color: 'rgba(255,255,255,0.75)',
          marginTop: verticalScale(5),
          fontWeight: '500',
        },
        noResultText: {
          fontSize: fontScale(14),
          color: colors.textLight,
          textAlign: 'center',
          paddingVertical: verticalScale(10),
        },
        rateInfoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.card,
          borderRadius: moderateScale(14),
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(13),
          marginBottom: verticalScale(14),
          borderWidth: 1,
          borderColor: colors.border,
        },
        rateInfoLeft: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        rateLabel: {
          fontSize: fontScale(13),
          color: colors.textSecondary,
          marginLeft: scale(8),
          fontWeight: '500',
        },
        rateValue: {
          fontSize: fontScale(14),
          fontWeight: '800',
          color: colors.text,
        },
        quickRefTitle: {
          fontSize: fontScale(15),
          fontWeight: '800',
          color: colors.text,
          marginBottom: verticalScale(10),
          letterSpacing: -0.3,
        },
        pairsGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        pairTile: {
          width: '47%',
          margin: '1.5%',
          backgroundColor: colors.card,
          borderRadius: moderateScale(14),
          padding: moderateScale(13),
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        },
        pairFromToRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: verticalScale(6),
        },
        pairCode: {
          fontSize: fontScale(14),
          fontWeight: '800',
          color: colors.text,
        },
        pairArrow: {
          marginHorizontal: scale(5),
        },
        pairRateText: {
          fontSize: fontScale(12),
          color: colors.primary,
          fontWeight: '700',
        },
        pairSymbols: {
          fontSize: fontScale(11),
          color: colors.textSecondary,
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('currency_converter')}</Text>
        <View style={[styles.approxBanner, colors.isDark && styles.approxBannerDark]}>
          <Ionicons
            name="warning"
            size={moderateScale(14)}
            color={colors.isDark ? '#FFB74D' : '#E65100'}
            style={styles.approxIcon}
          />
          <Text style={[styles.approxText, colors.isDark && styles.approxTextDark]}>
            APPROXIMATE RATES — Exchange rates are static, not live. Values are for reference only.
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.converterCard}>
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>{t('enter_amount')}</Text>
              <View style={styles.amountInputRow}>
                <Text style={styles.amountSymbol}>{fromCurrency.symbol}</Text>
                <TextInput
                  style={styles.amountInput}
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0"
                  placeholderTextColor={colors.textLight}
                />
              </View>
            </View>

            <View style={styles.selectorWrap}>
              <CurrencySelector
                label={t('from_currency')}
                value={fromCode}
                onChange={setFromCode}
              />
            </View>

            <View style={styles.swapSection}>
              <View style={styles.swapLine} />
              <TouchableOpacity style={styles.swapCircle} onPress={swapCurrencies}>
                <Ionicons name="swap-vertical" size={moderateScale(22)} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.swapLine} />
            </View>

            <View style={[styles.selectorWrap, { marginBottom: verticalScale(16) }]}>
              <CurrencySelector
                label={t('to_currency')}
                value={toCode}
                onChange={setToCode}
              />
            </View>

            {converted !== null ? (
              <View style={styles.resultBubble}>
                <Text style={styles.resultTag}>{t('result')}</Text>
                <View style={styles.resultRow}>
                  <Text style={styles.resultSymbol}>{toCurrency.symbol}</Text>
                  <Text style={styles.resultValue}>{formatConverted(converted)}</Text>
                </View>
                <Text style={styles.resultCurrencyName}>{toCurrency.name}</Text>
              </View>
            ) : (
              <Text style={styles.noResultText}>Enter a valid amount above</Text>
            )}
          </View>

          <View style={styles.rateInfoRow}>
            <View style={styles.rateInfoLeft}>
              <Ionicons name="swap-horizontal-outline" size={moderateScale(18)} color={colors.primary} />
              <Text style={styles.rateLabel}>{t('exchange_rate')}</Text>
            </View>
            <Text style={styles.rateValue}>
              1 {fromCode} = {formatConverted(exchangeRate)} {toCode}
            </Text>
          </View>

          <Text style={styles.quickRefTitle}>{t('quick_reference')}</Text>
          <View style={styles.pairsGrid}>
            {POPULAR_PAIRS.map(([from, to]) => {
              const rate = getExchangeRate(from, to);
              const fC = getCurrencyByCode(from);
              const tC = getCurrencyByCode(to);
              return (
                <TouchableOpacity
                  key={`${from}-${to}`}
                  style={styles.pairTile}
                  onPress={() => {
                    setFromCode(from);
                    setToCode(to);
                  }}
                  activeOpacity={0.75}
                >
                  <View style={styles.pairFromToRow}>
                    <Text style={styles.pairCode}>{from}</Text>
                    <Ionicons
                      name="arrow-forward"
                      size={moderateScale(12)}
                      color={colors.textSecondary}
                      style={styles.pairArrow}
                    />
                    <Text style={styles.pairCode}>{to}</Text>
                  </View>
                  <Text style={styles.pairRateText}>
                    {fC.symbol}1 = {tC.symbol}{formatConverted(rate)}
                  </Text>
                  <Text style={styles.pairSymbols}>{fC.name.split(' ')[0]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ height: verticalScale(30) }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

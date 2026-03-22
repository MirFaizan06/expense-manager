import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTransaction } from '../context/TransactionContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getCurrentTimestamp } from '../utils/timestamp';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

export default function TransactionScreen({ navigation }) {
  const { addTransaction } = useTransaction();
  const { currency } = useCurrency();
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [amount, setAmount] = useState('');
  const [type, setType] = useState('credit');
  const [remark, setRemark] = useState('');
  const [amountFocused, setAmountFocused] = useState(false);
  const remarkRef = useRef(null);

  const handleSubmit = () => {
    const parsed = parseFloat(amount);
    if (!amount.trim() || isNaN(parsed) || parsed <= 0) {
      Alert.alert(t('error'), t('amount_invalid'));
      return;
    }
    if (!remark.trim()) {
      Alert.alert(t('error'), t('remark_required'));
      return;
    }

    const newTransaction = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: parsed,
      currency: currency.code,
      type,
      remark: remark.trim(),
      timestamp: getCurrentTimestamp(),
      createdAt: Date.now(),
    };

    addTransaction(newTransaction);
    navigation.goBack();
  };

  const isCredit = type === 'credit';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: colors.background,
        },
        topBar: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(14),
          paddingVertical: verticalScale(12),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.card,
        },
        backBtn: {
          width: moderateScale(38),
          height: moderateScale(38),
          borderRadius: moderateScale(19),
          backgroundColor: colors.inputBg,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: scale(12),
          borderWidth: 1,
          borderColor: colors.border,
        },
        topTitle: {
          fontSize: fontScale(18),
          fontWeight: '800',
          color: colors.text,
          letterSpacing: -0.3,
        },
        scroll: {
          flex: 1,
          padding: scale(16),
        },
        typeCard: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(18),
          marginBottom: verticalScale(18),
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
        },
        typeCardLabel: {
          fontSize: fontScale(11),
          fontWeight: '700',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          padding: scale(14),
          paddingBottom: 0,
        },
        typeToggleRow: {
          flexDirection: 'row',
          padding: scale(10),
          gap: scale(8),
        },
        typeBtn: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: verticalScale(13),
          borderRadius: moderateScale(12),
          backgroundColor: colors.inputBg,
          borderWidth: 1.5,
          borderColor: colors.border,
        },
        typeBtnCreditActive: {
          backgroundColor: colors.creditBg,
          borderColor: colors.credit,
        },
        typeBtnDebitActive: {
          backgroundColor: colors.debitBg,
          borderColor: colors.debit,
        },
        typeBtnLabel: {
          fontSize: fontScale(14),
          fontWeight: '700',
          color: colors.textSecondary,
          marginLeft: scale(6),
        },
        typeBtnLabelCreditActive: {
          color: colors.credit,
        },
        typeBtnLabelDebitActive: {
          color: colors.debit,
        },
        amountCard: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(18),
          padding: moderateScale(18),
          marginBottom: verticalScale(14),
          borderWidth: 1,
          borderColor: colors.border,
        },
        amountCardLabel: {
          fontSize: fontScale(11),
          fontWeight: '700',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: verticalScale(10),
        },
        amountRow: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: moderateScale(14),
          paddingHorizontal: scale(16),
          borderColor: amountFocused ? colors.primary : colors.border,
          backgroundColor: colors.inputBg,
        },
        symbolText: {
          fontSize: fontScale(26),
          fontWeight: '900',
          color: colors.primary,
          marginRight: scale(8),
        },
        amountInput: {
          flex: 1,
          fontSize: fontScale(28),
          fontWeight: '800',
          color: colors.text,
          paddingVertical: verticalScale(13),
          letterSpacing: -1,
        },
        codeTag: {
          fontSize: fontScale(13),
          fontWeight: '700',
          color: colors.textSecondary,
          backgroundColor: colors.inputBg,
          paddingHorizontal: scale(8),
          paddingVertical: verticalScale(4),
          borderRadius: moderateScale(8),
          borderWidth: 1,
          borderColor: colors.border,
        },
        remarkCard: {
          backgroundColor: colors.card,
          borderRadius: moderateScale(18),
          padding: moderateScale(18),
          marginBottom: verticalScale(14),
          borderWidth: 1,
          borderColor: colors.border,
        },
        remarkCardLabel: {
          fontSize: fontScale(11),
          fontWeight: '700',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: verticalScale(10),
        },
        remarkInput: {
          fontSize: fontScale(15),
          color: colors.text,
          minHeight: verticalScale(80),
          textAlignVertical: 'top',
          paddingTop: 0,
          lineHeight: fontScale(24),
        },
        remarkCount: {
          fontSize: fontScale(11),
          color: colors.textLight,
          textAlign: 'right',
          marginTop: verticalScale(8),
        },
        timestampNote: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(4),
          marginBottom: verticalScale(20),
        },
        timestampText: {
          fontSize: fontScale(12),
          color: colors.textLight,
          marginLeft: scale(6),
          fontStyle: 'italic',
        },
        saveBtn: {
          backgroundColor: isCredit ? colors.credit : colors.debit,
          borderRadius: moderateScale(16),
          paddingVertical: verticalScale(16),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          shadowColor: isCredit ? colors.credit : colors.debit,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 7,
          marginBottom: verticalScale(12),
        },
        saveBtnText: {
          color: '#FFFFFF',
          fontSize: fontScale(16),
          fontWeight: '800',
          marginLeft: scale(8),
          letterSpacing: 0.2,
        },
        cancelBtn: {
          alignItems: 'center',
          paddingVertical: verticalScale(13),
          borderRadius: moderateScale(16),
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: verticalScale(20),
        },
        cancelBtnText: {
          fontSize: fontScale(14),
          color: colors.textSecondary,
          fontWeight: '600',
        },
      }),
    [colors, isCredit, amountFocused]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={moderateScale(20)} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>{t('add_new_transaction')}</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.typeCard}>
            <Text style={styles.typeCardLabel}>{t('transaction_type')}</Text>
            <View style={styles.typeToggleRow}>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'credit' && styles.typeBtnCreditActive]}
                onPress={() => setType('credit')}
              >
                <Ionicons
                  name="arrow-down-circle"
                  size={moderateScale(20)}
                  color={type === 'credit' ? colors.credit : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.typeBtnLabel,
                    type === 'credit' && styles.typeBtnLabelCreditActive,
                  ]}
                >
                  {t('credit')} (+)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'debit' && styles.typeBtnDebitActive]}
                onPress={() => setType('debit')}
              >
                <Ionicons
                  name="arrow-up-circle"
                  size={moderateScale(20)}
                  color={type === 'debit' ? colors.debit : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.typeBtnLabel,
                    type === 'debit' && styles.typeBtnLabelDebitActive,
                  ]}
                >
                  {t('debit')} (-)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.amountCard}>
            <Text style={styles.amountCardLabel}>{t('amount')}</Text>
            <View style={styles.amountRow}>
              <Text style={styles.symbolText}>{currency.symbol}</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={colors.textLight}
                returnKeyType="next"
                onFocus={() => setAmountFocused(true)}
                onBlur={() => setAmountFocused(false)}
                onSubmitEditing={() => remarkRef.current?.focus()}
              />
              <Text style={styles.codeTag}>{currency.code}</Text>
            </View>
          </View>

          <View style={styles.remarkCard}>
            <Text style={styles.remarkCardLabel}>{t('remark')} *</Text>
            <TextInput
              ref={remarkRef}
              style={styles.remarkInput}
              value={remark}
              onChangeText={setRemark}
              placeholder={t('remark_placeholder')}
              placeholderTextColor={colors.textLight}
              multiline
              maxLength={200}
            />
            <Text style={styles.remarkCount}>{remark.length} / 200</Text>
          </View>

          <View style={styles.timestampNote}>
            <Ionicons name="time-outline" size={moderateScale(14)} color={colors.textLight} />
            <Text style={styles.timestampText}>Timestamp recorded automatically on save</Text>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle" size={moderateScale(22)} color="#FFFFFF" />
            <Text style={styles.saveBtnText}>{t('save')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelBtnText}>{t('cancel')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTransaction } from '../context/TransactionContext';
import { useLanguage } from '../context/LanguageContext';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

export default function TransactionItem({ transaction }) {
  const { colors } = useTheme();
  const { deleteTransaction } = useTransaction();
  const { t } = useLanguage();

  const isCredit = transaction.type === 'credit';

  const handleDelete = () => {
    Alert.alert(t('delete'), t('delete_confirm'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        onPress: () => deleteTransaction(transaction.id),
        style: 'destructive',
      },
    ]);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.card,
          borderRadius: moderateScale(12),
          marginVertical: verticalScale(4),
          paddingHorizontal: scale(14),
          paddingVertical: verticalScale(12),
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 3,
          elevation: 2,
        },
        iconWrap: {
          width: moderateScale(42),
          height: moderateScale(42),
          borderRadius: moderateScale(21),
          backgroundColor: isCredit ? colors.creditBg : colors.debitBg,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: scale(12),
        },
        info: {
          flex: 1,
        },
        remark: {
          fontSize: fontScale(14),
          fontWeight: '600',
          color: colors.text,
          marginBottom: verticalScale(2),
        },
        timestamp: {
          fontSize: fontScale(11),
          color: colors.textSecondary,
        },
        right: {
          alignItems: 'flex-end',
          marginRight: scale(8),
        },
        amount: {
          fontSize: fontScale(15),
          fontWeight: '700',
          color: isCredit ? colors.credit : colors.debit,
        },
        currencyTag: {
          fontSize: fontScale(10),
          color: colors.textLight,
          marginTop: verticalScale(1),
        },
        deleteBtn: {
          padding: scale(6),
        },
      }),
    [colors, isCredit]
  );

  const sign = isCredit ? '+' : '-';

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons
          name={isCredit ? 'arrow-down-circle' : 'arrow-up-circle'}
          size={moderateScale(22)}
          color={isCredit ? colors.credit : colors.debit}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.remark} numberOfLines={1}>
          {transaction.remark}
        </Text>
        <Text style={styles.timestamp}>{transaction.timestamp}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>
          {sign}
          {(transaction.amount ?? 0).toFixed(2)}
        </Text>
        <Text style={styles.currencyTag}>{transaction.currency}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="trash-outline" size={moderateScale(17)} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );
}

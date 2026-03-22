import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CURRENCIES } from '../constants/currencies';
import { useTheme } from '../context/ThemeContext';
import { moderateScale, scale, verticalScale, fontScale, SCREEN_HEIGHT } from '../utils/scale';

export default function CurrencySelector({ value, onChange, label }) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const selected = useMemo(
    () => CURRENCIES.find((c) => c.code === value) || CURRENCIES[0],
    [value]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return CURRENCIES;
    const q = search.toLowerCase();
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [search]);

  const close = () => {
    setVisible(false);
    setSearch('');
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        label: {
          fontSize: fontScale(13),
          color: colors.textSecondary,
          marginBottom: verticalScale(6),
          fontWeight: '500',
        },
        selector: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: moderateScale(10),
          paddingHorizontal: scale(14),
          paddingVertical: verticalScale(12),
          backgroundColor: colors.inputBg,
        },
        selectorLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        },
        selectorSymbol: {
          fontSize: fontScale(18),
          fontWeight: '700',
          color: colors.primary,
          width: scale(30),
        },
        selectorCode: {
          fontSize: fontScale(15),
          fontWeight: '700',
          color: colors.text,
          marginRight: scale(6),
        },
        selectorName: {
          fontSize: fontScale(13),
          color: colors.textSecondary,
          flex: 1,
        },
        overlay: {
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: 'flex-end',
        },
        modal: {
          maxHeight: SCREEN_HEIGHT * 0.75,
          backgroundColor: colors.surface,
          borderTopLeftRadius: moderateScale(20),
          borderTopRightRadius: moderateScale(20),
          overflow: 'hidden',
        },
        modalHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(14),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        modalTitle: {
          fontSize: fontScale(17),
          fontWeight: '700',
          color: colors.text,
        },
        searchWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: scale(12),
          marginVertical: verticalScale(10),
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: moderateScale(10),
          paddingHorizontal: scale(12),
          backgroundColor: colors.inputBg,
        },
        searchInput: {
          flex: 1,
          paddingVertical: verticalScale(10),
          color: colors.text,
          fontSize: fontScale(14),
        },
        item: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(12),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        itemSymbol: {
          fontSize: fontScale(17),
          width: scale(36),
          color: colors.primary,
          fontWeight: '700',
        },
        itemInfo: {
          flex: 1,
        },
        itemCode: {
          fontSize: fontScale(14),
          fontWeight: '700',
          color: colors.text,
        },
        itemName: {
          fontSize: fontScale(12),
          color: colors.textSecondary,
          marginTop: verticalScale(1),
        },
        itemRate: {
          fontSize: fontScale(11),
          color: colors.textLight,
        },
        checkmark: {
          marginLeft: scale(8),
        },
        emptyText: {
          textAlign: 'center',
          padding: scale(20),
          color: colors.textSecondary,
          fontSize: fontScale(14),
        },
      }),
    [colors]
  );

  return (
    <>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
        <View style={styles.selectorLeft}>
          <Text style={styles.selectorSymbol}>{selected.symbol}</Text>
          <Text style={styles.selectorCode}>{selected.code}</Text>
          <Text style={styles.selectorName} numberOfLines={1}>{selected.name}</Text>
        </View>
        <Ionicons name="chevron-down" size={moderateScale(18)} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || 'Select Currency'}</Text>
              <TouchableOpacity onPress={close} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={moderateScale(24)} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.searchWrap}>
              <Ionicons
                name="search"
                size={moderateScale(18)}
                color={colors.textSecondary}
                style={{ marginRight: scale(8) }}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by code or name..."
                placeholderTextColor={colors.textLight}
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={moderateScale(18)} color={colors.textLight} />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={<Text style={styles.emptyText}>No currencies found</Text>}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onChange(item.code);
                    close();
                  }}
                >
                  <Text style={styles.itemSymbol}>{item.symbol}</Text>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemCode}>{item.code}</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                  <Text style={styles.itemRate}>{item.rate === 1 ? 'Base' : `~${item.rate}`}</Text>
                  {item.code === value && (
                    <Ionicons
                      name="checkmark-circle"
                      size={moderateScale(20)}
                      color={colors.primary}
                      style={styles.checkmark}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

import React, { useMemo } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { moderateScale, scale, verticalScale, fontScale } from '../utils/scale';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { t } = useLanguage();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: scale(14),
          paddingVertical: verticalScale(13),
          backgroundColor: colors.card,
          borderRadius: moderateScale(12),
          borderWidth: 1,
          borderColor: colors.border,
        },
        left: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        label: {
          fontSize: fontScale(15),
          color: colors.text,
          marginLeft: scale(10),
          fontWeight: '500',
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'}
          size={moderateScale(22)}
          color={isDarkMode ? '#7986CB' : '#FF9800'}
        />
        <Text style={styles.label}>{isDarkMode ? t('dark_mode') : t('nature_mode')}</Text>
      </View>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: '#BDBDBD', true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

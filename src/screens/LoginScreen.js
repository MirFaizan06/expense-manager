import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { moderateScale, scale, verticalScale, fontScale, SCREEN_WIDTH } from '../utils/scale';

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const passwordRef = useRef(null);

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert(t('error'), t('login_error_empty'));
      return;
    }
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert(t('error'), t('login_error_invalid'));
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        outer: {
          flex: 1,
          backgroundColor: colors.background,
        },
        heroBg: {
          backgroundColor: colors.primary,
          paddingTop: verticalScale(60),
          paddingBottom: verticalScale(60),
          paddingHorizontal: scale(28),
          alignItems: 'center',
        },
        logoRing: {
          width: moderateScale(90),
          height: moderateScale(90),
          borderRadius: moderateScale(45),
          backgroundColor: 'rgba(255,255,255,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: verticalScale(18),
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.3)',
        },
        logoInner: {
          width: moderateScale(72),
          height: moderateScale(72),
          borderRadius: moderateScale(36),
          backgroundColor: 'rgba(255,255,255,0.25)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        heroTitle: {
          fontSize: fontScale(30),
          fontWeight: '800',
          color: '#FFFFFF',
          letterSpacing: -0.8,
          marginBottom: verticalScale(4),
        },
        heroSub: {
          fontSize: fontScale(14),
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: 0.3,
        },
        formSheet: {
          backgroundColor: colors.card,
          borderTopLeftRadius: moderateScale(28),
          borderTopRightRadius: moderateScale(28),
          marginTop: -verticalScale(28),
          paddingHorizontal: scale(24),
          paddingTop: verticalScale(30),
          paddingBottom: verticalScale(20),
          flex: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 12,
        },
        welcomeText: {
          fontSize: fontScale(22),
          fontWeight: '800',
          color: colors.text,
          marginBottom: verticalScale(6),
          letterSpacing: -0.5,
        },
        welcomeSub: {
          fontSize: fontScale(14),
          color: colors.textSecondary,
          marginBottom: verticalScale(28),
          lineHeight: fontScale(22),
        },
        fieldGroup: {
          marginBottom: verticalScale(18),
        },
        label: {
          fontSize: fontScale(12),
          fontWeight: '700',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: verticalScale(8),
        },
        inputWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1.5,
          borderRadius: moderateScale(14),
          backgroundColor: colors.inputBg,
          paddingHorizontal: scale(14),
          minHeight: verticalScale(52),
        },
        inputWrapNormal: {
          borderColor: colors.border,
        },
        inputWrapFocused: {
          borderColor: colors.primary,
          backgroundColor: colors.isDark ? colors.inputBg : '#F0FBF0',
        },
        inputIcon: {
          marginRight: scale(10),
        },
        input: {
          flex: 1,
          fontSize: fontScale(16),
          color: colors.text,
          paddingVertical: verticalScale(12),
        },
        eyeBtn: {
          padding: scale(6),
        },
        hintCard: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: colors.creditBg,
          borderRadius: moderateScale(12),
          padding: moderateScale(12),
          marginBottom: verticalScale(24),
          borderWidth: 1,
          borderColor: colors.credit + '33',
        },
        hintText: {
          fontSize: fontScale(12),
          color: colors.credit,
          marginLeft: scale(8),
          flex: 1,
          lineHeight: fontScale(18),
          fontWeight: '500',
        },
        loginBtn: {
          backgroundColor: colors.primary,
          borderRadius: moderateScale(16),
          paddingVertical: verticalScale(16),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.45,
          shadowRadius: 14,
          elevation: 8,
          marginBottom: verticalScale(24),
        },
        loginBtnText: {
          color: '#FFFFFF',
          fontSize: fontScale(16),
          fontWeight: '800',
          letterSpacing: 0.3,
          marginLeft: scale(8),
        },
        footer: {
          alignItems: 'center',
          paddingTop: verticalScale(8),
        },
        footerText: {
          fontSize: fontScale(12),
          color: colors.textLight,
          letterSpacing: 0.3,
        },
        footerBrand: {
          fontSize: fontScale(12),
          color: colors.primary,
          fontWeight: '700',
          marginTop: verticalScale(3),
        },
      }),
    [colors, focusedField]
  );

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroBg}>
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <Ionicons name="wallet" size={moderateScale(36)} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.heroTitle}>{t('app_name')}</Text>
          <Text style={styles.heroSub}>Hachi wa Studios</Text>
        </View>

        <View style={styles.formSheet}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.welcomeSub}>Sign in to manage your daily expenses</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('username')}</Text>
            <View
              style={[
                styles.inputWrap,
                focusedField === 'username' ? styles.inputWrapFocused : styles.inputWrapNormal,
              ]}
            >
              <Ionicons
                name="person-outline"
                size={moderateScale(18)}
                color={focusedField === 'username' ? colors.primary : colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder={t('username')}
                placeholderTextColor={colors.textLight}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('password')}</Text>
            <View
              style={[
                styles.inputWrap,
                focusedField === 'password' ? styles.inputWrapFocused : styles.inputWrapNormal,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={moderateScale(18)}
                color={focusedField === 'password' ? colors.primary : colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                ref={passwordRef}
                style={styles.input}
                placeholder={t('password')}
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword((v) => !v)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={moderateScale(18)}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.hintCard}>
            <Ionicons name="information-circle-outline" size={moderateScale(16)} color={colors.credit} />
            <Text style={styles.hintText}>{t('first_login_note')}</Text>
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Ionicons name="log-in-outline" size={moderateScale(20)} color="#FFFFFF" />
            )}
            <Text style={styles.loginBtnText}>
              {loading ? 'Signing in...' : t('login')}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Developed by The NxT LvL aka Faizan  •  v1.0.0</Text>
            <Text style={styles.footerBrand}>Hachi wa Studios</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

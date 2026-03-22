import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES } from '../constants/languages';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [langCode, setLangCode] = useState('en');
  const [language, setLanguage] = useState(LANGUAGES.en);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const saved = await AsyncStorage.getItem('em_language');
    if (saved && LANGUAGES[saved]) {
      setLangCode(saved);
      setLanguage(LANGUAGES[saved]);
    }
  };

  const changeLanguage = async (code) => {
    if (LANGUAGES[code]) {
      setLangCode(code);
      setLanguage(LANGUAGES[code]);
      await AsyncStorage.setItem('em_language', code);
    }
  };

  const t = (key) => {
    const val = language.strings[key];
    if (val !== undefined) return val;
    const fallback = LANGUAGES.en.strings[key];
    if (fallback !== undefined) return fallback;
    return key;
  };

  return (
    <LanguageContext.Provider value={{ langCode, language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;

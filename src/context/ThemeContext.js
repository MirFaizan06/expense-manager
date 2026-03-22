import React, { createContext, useContext, useState, useEffect } from 'react';
import { NATURE_THEME, DARK_THEME } from '../constants/themes';
import { loadSettings, saveSettings } from '../utils/storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const settings = await loadSettings();
      if (settings && settings.theme) {
        setIsDarkMode(settings.theme === 'dark');
      }
    } catch (e) {
      console.error('ThemeContext loadTheme error:', e);
    }
  };

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const settings = (await loadSettings()) || {};
    await saveSettings({ ...settings, theme: newMode ? 'dark' : 'nature' });
  };

  const applyTheme = async (themeName) => {
    const isDark = themeName === 'dark';
    setIsDarkMode(isDark);
    const settings = (await loadSettings()) || {};
    await saveSettings({ ...settings, theme: themeName });
  };

  const colors = isDarkMode ? DARK_THEME : NATURE_THEME;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, applyTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;

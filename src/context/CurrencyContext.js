import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrencyByCode } from '../constants/currencies';
import { loadSettings, saveSettings } from '../utils/storage';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState('INR');
  const [currency, setCurrency] = useState(getCurrencyByCode('INR'));

  useEffect(() => {
    loadCurrency();
  }, []);

  const loadCurrency = async () => {
    try {
      const settings = await loadSettings();
      if (settings && settings.currency) {
        const found = getCurrencyByCode(settings.currency);
        setCurrencyCode(settings.currency);
        setCurrency(found);
      }
    } catch (e) {
      console.error('CurrencyContext loadCurrency error:', e);
    }
  };

  const changeCurrency = async (code) => {
    const found = getCurrencyByCode(code);
    setCurrencyCode(code);
    setCurrency(found);
    const settings = (await loadSettings()) || {};
    await saveSettings({ ...settings, currency: code });
  };

  const applyCurrency = (code) => {
    const found = getCurrencyByCode(code);
    setCurrencyCode(code);
    setCurrency(found);
  };

  return (
    <CurrencyContext.Provider
      value={{ currencyCode, currency, changeCurrency, applyCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
export default CurrencyContext;

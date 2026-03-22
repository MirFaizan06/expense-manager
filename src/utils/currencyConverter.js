import { CURRENCIES } from '../constants/currencies';

export const convertCurrency = (amount, fromCode, toCode) => {
  if (!amount || isNaN(Number(amount))) return 0;
  const num = Number(amount);
  if (fromCode === toCode) return num;

  const fromCurrency = CURRENCIES.find((c) => c.code === fromCode);
  const toCurrency = CURRENCIES.find((c) => c.code === toCode);

  if (!fromCurrency || !toCurrency) return 0;

  const amountInUSD = num / fromCurrency.rate;
  return amountInUSD * toCurrency.rate;
};

export const getExchangeRate = (fromCode, toCode) => {
  if (fromCode === toCode) return 1;
  const fromCurrency = CURRENCIES.find((c) => c.code === fromCode);
  const toCurrency = CURRENCIES.find((c) => c.code === toCode);
  if (!fromCurrency || !toCurrency) return 1;
  return toCurrency.rate / fromCurrency.rate;
};

export const formatConverted = (amount) => {
  if (amount === 0) return '0.00';
  if (amount >= 1000000) return amount.toFixed(0);
  if (amount >= 1000) return amount.toFixed(2);
  if (amount >= 1) return amount.toFixed(4);
  return amount.toFixed(6);
};

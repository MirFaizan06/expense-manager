import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTransactions(transactions);
    }
  }, [transactions, isLoaded]);

  const loadAll = async () => {
    const saved = await loadTransactions();
    setTransactions(saved || []);
    setIsLoaded(true);
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAllTransactions = () => {
    setTransactions([]);
  };

  const restoreTransactions = (newTransactions) => {
    setTransactions(newTransactions || []);
    setIsLoaded(true);
  };

  const balance = useMemo(() => {
    return transactions.reduce((acc, t) => {
      return t.type === 'credit' ? acc + t.amount : acc - t.amount;
    }, 0);
  }, [transactions]);

  const totalCredit = useMemo(
    () => transactions.filter((t) => t.type === 'credit').reduce((a, t) => a + t.amount, 0),
    [transactions]
  );

  const totalDebit = useMemo(
    () => transactions.filter((t) => t.type === 'debit').reduce((a, t) => a + t.amount, 0),
    [transactions]
  );

  const recentTransactions = useMemo(
    () => [...transactions].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10),
    [transactions]
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        totalCredit,
        totalDebit,
        recentTransactions,
        addTransaction,
        deleteTransaction,
        clearAllTransactions,
        restoreTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
export default TransactionContext;

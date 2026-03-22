export const generateDailyReports = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const reports = {};

  transactions.forEach((t) => {
    const dateObj = new Date(t.createdAt);
    const dateKey = dateObj.toDateString();

    if (!reports[dateKey]) {
      reports[dateKey] = {
        date: dateKey,
        dateTimestamp: new Date(dateObj).setHours(0, 0, 0, 0),
        totalCredit: 0,
        totalDebit: 0,
        transactions: [],
        currency: t.currency,
      };
    }

    if (t.type === 'credit') {
      reports[dateKey].totalCredit += t.amount;
    } else {
      reports[dateKey].totalDebit += t.amount;
    }

    reports[dateKey].transactions.push(t);
  });

  return Object.values(reports).sort((a, b) => b.dateTimestamp - a.dateTimestamp);
};

export const getTodayReport = (transactions) => {
  const today = new Date().toDateString();
  return (
    generateDailyReports(transactions).find((r) => r.date === today) || null
  );
};

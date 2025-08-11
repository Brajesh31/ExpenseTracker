import React, { useMemo } from 'react';
import CustomBarChart from '../../Charts/CustomBarChart';

const IncomePageOverview = ({ transaction, onAddIncome }) => {
  // Transform incomeData into chartData
  const chartData = useMemo(() => {
    const grouped = {};

    transaction.forEach(({ amount, date }) => {
      const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });

      if (!grouped[formattedDate]) {
        grouped[formattedDate] = 0;
      }
      grouped[formattedDate] += parseFloat(amount);
    });

    return Object.keys(grouped).map((label) => ({
      label,
      amount: grouped[label],
    }));
  }, [transaction]);

  return (
    <div className="bg-gray-50 shadow-md rounded-xl p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Income Overview</h2>
        <button
          onClick={onAddIncome}
          className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 rounded"
        >
          + Add Income
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Track your earnings over time and analyze your income trends
      </p>

      {/* ✅ Pass transformed chart data */}
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default IncomePageOverview;

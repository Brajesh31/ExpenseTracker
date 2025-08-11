import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';

const ExpenseOverview = ({ expenseData }) => {
  const [chartData, setChartData] = useState([]);

  // Prepare data with category and amount
  const prepareExpenseBarChartData = (data = []) => {
    return data.map((item) => ({
      category: item?.category || 'Unknown',
      amount: item?.amount || 0,
    }));
  };

  useEffect(() => {
    const result = prepareExpenseBarChartData(expenseData);
    setChartData(result);
  }, [expenseData]); // ✅ FIXED: was incorrectly set to [data]

  return (
    <div className='bg-white p-6 rounded-xl shadow-xl hover:-translate-y-1 transition-transform duration-300'>
      <div className='flex items-center justify-between'>
        <h5 className='text-xl font-bold text-gray-800'>Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default ExpenseOverview;

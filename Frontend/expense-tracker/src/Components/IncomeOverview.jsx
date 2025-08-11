import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const IncomeOverview = ({ incomeData, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = incomeData?.map((item) => ({
      name: item?.source || 'Unknown',
      amount: item?.amount || 0,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [incomeData]);

  return (
    <div className='bg-white p-6 rounded-xl shadow-xl hover:-translate-y-1 transition-transform duration-300'>
      <div className='flex items-center justify-between'>
        <h5 className='text-xl font-bold text-gray-800'>Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default IncomeOverview;

// src/Charts/CustomBarChart.jsx

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

const CustomBarChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Determine the key dynamically (amount is common, but xKey differs)
  const xKey = data[0].month ? 'month' : data[0].category ? 'category' : 'label';

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />

        {/* ✅ Custom Legend with smaller text */}
        <Legend
          iconType="circle"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: '12px', // smaller text
            paddingTop: '10px',
          }}
        />

        <Bar dataKey="amount" name="Income Amount" fill="#a855f7" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
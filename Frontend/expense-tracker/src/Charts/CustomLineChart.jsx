import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white flex flex-col gap-4 rounded-md shadow-lg border border-gray-100">
        <p className="text-lg font-medium text-gray-800">{`${label}`}</p>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <p className="text-sm text-gray-600">
                Expense Amount:
                <span className="ml-2 font-bold text-gray-900">{`₹${payload[0].value}`}</span>
            </p>
        </div>
      </div>
    );
  }
  return null;
};


// The main chart component, now using AreaChart
const CustomLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    // Render a loading or empty state if you prefer
    return (
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">No data available</p>
        </div>
    );
  }

  // Dynamically determine the key for the X-axis
  const xKey = data[0].month ? 'month' : data[0].category ? 'category' : 'label';

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {/* Define the gradient for the fill */}
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
        </defs>
        
        {/* Grid lines - only vertical and dashed */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={false} />
        
        {/* X-Axis styling */}
        <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10} // Push labels down
        />
        
        {/* Y-Axis styling */}
        <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => `₹${value}`} // Format ticks as currency
            dx={-10} // Push labels left
        />
        
        {/* Custom Tooltip */}
        <Tooltip content={<CustomTooltip />} />
        
        {/* The Area component creates the filled gradient effect */}
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#a855f7"
          fill="url(#colorAmount)"
          strokeWidth={3}
          dot={{ r: 6, stroke: '#a855f7', fill: 'white', strokeWidth: 2 }}
          activeDot={{ r: 8, stroke: '#a855f7', fill: 'white', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};


export default CustomLineChart ;
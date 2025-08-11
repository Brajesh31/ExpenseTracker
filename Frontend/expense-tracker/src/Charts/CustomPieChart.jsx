import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey='amount'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip />

        {/* ✅ Custom Legend */}
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: '15px', // smaller text
            marginTop: '20px',
          }}
        />

        {/* ✅ Center Text */}
        {showTextAnchor && (
          <>
            <text
              x='50%'
              y='50%'
              dy={-25}
              textAnchor='middle'
              fill='#666'
              fontSize='14px'
              fontWeight='500'
            >
              {label}
            </text>
            <text
              x='50%'
              y='50%'
              dy={8}
              textAnchor='middle'
              fill='#333'
              fontSize='24px'
              fontWeight='bold'
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;

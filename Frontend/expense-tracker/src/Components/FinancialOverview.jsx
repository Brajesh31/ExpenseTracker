import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CustomPieChart from '../Charts/CustomPieChart';


const COLORS = ['#875CF5' , '#FA2C37', '#FF6900']
const FinancialOverview = ({totalIncome , totalBalance , totalExpenses }) => {
  const balanceData = [
    { name : "Total Balance" , amount : totalBalance },
    { name : "Total Expenses" , amount : totalExpenses },
    { name : "Total Income" , amount : totalIncome },
  ]
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl hover:-translate-y-1 transition-transform duration-300">  
      <div className='flex justify-center items-center'>
        <h5 className='text-xl font-bold text-gray-800'>Financial Overview</h5>
      </div>

      <CustomPieChart
       data={balanceData}
       label="Total Balance"
       totalAmount={`${totalBalance}`}
       colors = {COLORS}
       showTextAnchor
      />
    </div>
  )
}

export default FinancialOverview
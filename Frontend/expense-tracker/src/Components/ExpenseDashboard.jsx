import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingDown } from "react-icons/fi";

// Format date
const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString))) return 'Invalid Date';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format amount to INR
const formatCurrency = (amount) => {
  const numericAmount = typeof amount === 'number' ? amount : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(numericAmount);
};

const ExpenseDashboard = ({ expenseData }) => {
  const navigate = useNavigate();

  if (!Array.isArray(expenseData) || expenseData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Expenses</h2>
        <p className="text-gray-500">No expenses to display.</p>
      </div>
    );
  }

  const expensesToShow = expenseData.slice(0, 5); // Always show only 5

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Expenses</h2>
        <button
          onClick={() => navigate('/expense')}
          className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors"
        >
          See All →
        </button>
      </div>

      {/* Expense list */}
      <div className="space-y-2">
        {expensesToShow.map((expense, index) => {
          const {
            _id,
            icon = '❓',
            category = 'Unspecified Source',
            date,
            amount = 0,
          } = expense;

          return (
            <div
              key={_id || index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              {/* Left: icon, category, date */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                  <span className="text-xl">{icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{category}</p>
                  <p className="text-sm text-gray-500">{formatDate(date)}</p>
                </div>
              </div>

              {/* Right: amount */}
              <div className="flex items-center justify-center bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
                <FiTrendingDown className="mr-1" />
                <span>{formatCurrency(amount).replace('₹', '')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseDashboard;
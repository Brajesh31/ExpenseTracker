import React from 'react';
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

// Format date like "29 Jul 2025"
const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString))) return 'Invalid Date';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format number to INR currency
const formatCurrency = (amount) => {
  const numericAmount = typeof amount === 'number' ? amount : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(numericAmount);
};

const RecentTransaction = ({ recentTransactions }) => {
  if (!Array.isArray(recentTransactions) || recentTransactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <p className="text-gray-500">No recent transactions to display.</p>
      </div>
    );
  }

  // Backend already sends the latest 5 sorted, so we don’t need to sort or slice again
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
        <a href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors">
          See All →
        </a>
      </div>

      <div className="space-y-2">
        {recentTransactions.map((transaction, index) => {
          if (!transaction || typeof transaction !== 'object') return null;

          const {
            _id,
            icon = '❓',
            category,
            source,
            date,
            amount = 0,
            type: transactionType,
          } = transaction;

          const type = transactionType || (source ? 'income' : 'expense');
          const displayName = type === 'income'
            ? source || 'Income'
            : category || 'Expense';

          return (
            <div key={_id || index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                  <span className="text-xl">{icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{displayName}</p>
                  <p className="text-sm text-gray-500">{formatDate(date)}</p>
                </div>
              </div>

              <p className={`flex items-center justify-center font-semibold px-3 py-1 rounded-full ${type === 'income' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}>
                {type === 'income' ? (
                  <FiTrendingUp className="mr-1" />
                ) : (
                  <FiTrendingDown className="mr-1" />
                )}
                {formatCurrency(amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransaction;
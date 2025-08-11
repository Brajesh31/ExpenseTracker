import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp } from "react-icons/fi";

// Format date
const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString))) return 'Invalid Date';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format currency
const formatCurrency = (amount) => {
  const numericAmount = typeof amount === 'number' ? amount : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(numericAmount);
};

const IncomeDashboard = ({ incomeData }) => {
  const navigate = useNavigate();

  if (!Array.isArray(incomeData) || incomeData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Income</h2>
        <p className="text-gray-500">No income to display.</p>
      </div>
    );
  }

  const incomeToShow = incomeData.slice(0, 5); // always showing only 5 items

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Income</h2>
        <button
          onClick={() => navigate('/income')}
          className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors"
        >
          See All →
        </button>
      </div>

      {/* Income List */}
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {incomeToShow.map((income, index) => {
          const {
            _id,
            icon = '❓',
            source = 'Unspecified Source',
            date,
            amount = 0,
          } = income;

          return (
            <div
              key={_id || index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              {/* Left */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                  <span className="text-xl">{icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{source}</p>
                  <p className="text-sm text-gray-500">{formatDate(date)}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center justify-center bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full">
                <FiTrendingUp className="mr-1" />
                <span>{formatCurrency(amount).replace('₹', '₹')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncomeDashboard;


import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const TransactionInfoCard = ({ title, icon, date, amount, type, onDelete }) => {
  return (
    // Using the user-provided styles with cleaned up class names
    <div className="group flex items-center justify-between px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl">
          <span>{icon}</span>
        </div>
        <div>
          <h6 className="font-medium text-sm text-gray-800">{title}</h6>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      {/* ✅ Increased gap from 2 to 4 for better spacing */}
      <div className="flex items-center gap-4 ml-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Delete ${title}`}
        >
          <FaRegTrashAlt size={16} />
        </button>

        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md border ${
          type === 'income' 
            ? 'text-green-700 bg-green-100 border-green-200' // Added matching border color
            : 'text-red-700 bg-red-100 border-red-200'     // Added matching border color
        }`}>
          <span>{type === 'income' ? `+ ₹${amount.toLocaleString()}` : `- ₹${amount.toLocaleString()}`}</span>
          {/* Using a different icon for expenses for better clarity */}
          {type === 'income' ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
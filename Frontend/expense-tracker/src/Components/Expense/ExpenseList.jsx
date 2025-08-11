
import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../../Components/Income/TransactionInfoCard'; // Reusing the same card
import moment from 'moment';

const ExpenseList = ({ transaction, onDelete, onDownload }) => {
  return (
    <div className='card bg-white p-4 rounded-xl shadow-lg'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg font-semibold text-gray-800'>Expense Categories</h5>
        <button
          onClick={onDownload}
          className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-100 transition-colors'
        >
          <LuDownload className='text-base' />
          <span>Download</span>
        </button>
      </div>

      <div className='mt-3 space-y-2'>
        {transaction?.length > 0 ? (
          transaction.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No expense records found.</p>
            <p className="text-sm">Click "Add Expense" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

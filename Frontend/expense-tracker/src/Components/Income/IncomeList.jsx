import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transaction, onDelete, onDownload }) => {
  return (
    <div className='bg-white p-4 rounded-xl shadow-lg'>
      {/* Header row */}
      <div className='flex items-center justify-between'>
        <h5 className='text-base font-semibold text-gray-800'>Income Sources</h5>
        <button
          onClick={onDownload}
          className='flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-100 border border-purple-100 rounded-md px-3 py-1.5 hover:bg-purple-100 transition'
        >
          <LuDownload className='text-sm' />
          <span>Download</span>
        </button>
      </div>

      {/* List */}
      <div className='mt-3 space-y-2'>
        {transaction?.length > 0 ? (
          transaction.map((income) => (
            <TransactionInfoCard
              key={income.id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income.id)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No income records found.</p>
            <p className="text-sm">Click "Add Income" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;

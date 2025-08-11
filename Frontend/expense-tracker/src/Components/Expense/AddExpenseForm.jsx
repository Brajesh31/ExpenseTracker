import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Picker from 'emoji-picker-react';

const AddExpenseForm = ({ onAddExpense }) => {
  // State to manage form inputs
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [icon, setIcon] = useState('🛒'); // A default icon for expenses
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setIcon(emojiObject.emoji);
    setShowPicker(false); // Close picker after selection
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) return toast.error("Category is required.");
    
    onAddExpense({ category, amount, date, icon });

    // Reset form fields after submission
    setCategory('');
    setAmount('');
    setDate('');
    setIcon('🛒'); // Reset to default expense icon
  };

  // Effect to close the picker when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Icon Selector */}
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Icon
        </label>
        <div className="flex items-center mb-2">
          <button
            type="button"
            onClick={() => setShowPicker(val => !val)}
            className="text-4xl mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            {icon}
          </button>
          <p className="font-medium text-gray-700">Change Icon</p>
        </div>
        {showPicker && (
          // The picker is positioned absolutely relative to the form
          <div ref={pickerRef} className="absolute z-10">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      {/* Expense Category Input */}
      <div>
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
          Expense Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          placeholder="e.g., Groceries, Rent"
          required
        />
      </div>

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Date Input */}
      <div>
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
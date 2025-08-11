import React, { useState, useEffect, useRef } from 'react';
import Picker from 'emoji-picker-react';

const AddIncomeForm = ({ onAddIncome }) => {
  // State to manage form inputs
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [icon, setIcon] = useState('👤'); // A default icon
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setIcon(emojiObject.emoji);
    setShowPicker(false); // Close picker after selection
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Call the onAddIncome function passed from the parent component
    onAddIncome({
      source,
      amount,
      date,
      icon,
    });

    // Optional: Reset form fields after submission
    setSource('');
    setAmount('');
    setDate('');
    setIcon('💼');
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

      {/* Income Source Input */}
      <div>
        <label htmlFor="source" className="block mb-2 text-sm font-medium text-gray-900">
          Income Source
        </label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          placeholder="e.g., Freelance, Salary"
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
          placeholder="Enter amount in INR"
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
        Add Income
      </button>
    </form>
  );
};

export default AddIncomeForm;

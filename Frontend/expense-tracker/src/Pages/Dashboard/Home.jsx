import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { serverDataContext } from '../../Context/ServerContext';

// Import child components
import RecentTransaction from '../../Components/RecentTransaction';
import FinancialOverview from '../../Components/FinancialOverview';
import ExpenseDashboard from '../../Components/ExpenseDashboard';
import ExpenseOverview from '../../Components/ExpenseOverview';

// Import icons for stat cards
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import IncomeDashboard from '../../Components/IncomeDashboard';
import IncomeOverview from '../../Components/IncomeOverview';

const Home = () => {
  const { serverUrl } = useContext(serverDataContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any API errors

  // Helper function for stat cards, now safer
  const formatCurrency = (amount) => {
    // Ensure the input is a number before formatting
    const numericAmount = typeof amount === 'number' ? amount : 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(numericAmount);
  };

  const handleUserData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/dashboard/`, { withCredentials: true });
      console.log(response.data)
      setUserData(response.data);
    } catch (err) {
      console.error("Data can not be fetched", err);
      // Set an error message to be displayed to the user
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-xl text-gray-600">Loading...</h1>
            </div>
        </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-8 text-center">
                <h2 className="text-xl text-red-500">{error}</h2>
            </div>
        </div>
    );
  }

  // 3. No Data State (if API succeeds but returns no data)
  // if (!userData) {
  //   return (
  //       <div className="min-h-screen bg-gray-50 flex flex-col">
  //           <Navbar />
  //           <div className="flex-grow flex items-center justify-center p-8 text-center">
  //               <h2 className="text-xl text-gray-700">No dashboard data available.</h2>
  //           </div>
  //       </div>
  //   );
  // }

  // 4. Success State (Render the dashboard)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Top Stat Cards */}
        <div className="mt-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-center items-center w-12 h-12 rounded-full bg-purple-500"><FaWallet size={22} className="text-white" /></div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Balance</p>
              <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalBalance)}</h3>
            </div>
          </div>
          {/* Income Card */}
          <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-center items-center w-12 h-12 rounded-full bg-orange-500"><FaArrowUp size={22} className="text-white" /></div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Income</p>
              <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalIncome)}</h3>
            </div>
          </div>
          {/* Expense Card */}
          <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-center items-center w-12 h-12 rounded-full bg-red-500"><FaArrowDown size={22} className="text-white" /></div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalExpenses)}</h3>
            </div>
          </div>
        </div>

        {/* Main content area with two-column grid */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            {/* Pass an empty array as a fallback to prevent crashes */}
            <RecentTransaction recentTransactions={userData.recentTransactions || []} />
          </div>
          <div className="lg:col-span-2">
            <FinancialOverview
              totalIncome={userData.totalIncome || 0}
              totalBalance={userData.totalBalance || 0}
              totalExpenses={userData.totalExpenses || 0} />
          </div>
        </div>

        {/* Expenses and last 30 days Expense */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <ExpenseOverview expenseData={userData?.last30DaysExpenses?.transaction || [] } />
          </div>
          <div className="lg:col-span-3">
            {/* Use optional chaining and a fallback to prevent crashes */}
            <ExpenseDashboard expenseData={userData?.last30DaysExpenses?.transaction || []} />
          </div>
        </div>

        {/* last 60 days income and income */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-5 gap-6" >
          <div className="lg:col-span-3">
            <IncomeDashboard incomeData={userData?.last60DaysIncome?.transaction || [] } />
          </div>
          <div className="lg:col-span-2">
            <IncomeOverview incomeData={userData?.last60DaysIncome?.transaction || [] } totalIncome={userData?.totalIncome || 0} />  
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

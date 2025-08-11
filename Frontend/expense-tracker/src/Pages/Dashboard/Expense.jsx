// /pages/Expense.js

import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import { serverDataContext } from '../../Context/ServerContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import ExpensePageOverview from '../../Components/Expense/ExpensePageOverview';
import ExpenseList from '../../Components/Expense/ExpenseList';
import Modal from '../../Components/Income/Modal';
import AddExpenseForm from '../../Components/Expense/AddExpenseForm';
import DeleteConfirmationModal from '../../Components/Income/DeleteConfirmationModal';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const { serverUrl } = useContext(serverDataContext);

  // ✅ Fetch Expense Data from Backend
  const FetchExpenseData = async () => {
    if (!loading) setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/api/expense/all`, { withCredentials: true });
      // CORRECTED: Changed to response.data.expenses (plural) to match backend conventions
      console.log("Expenses are listed : ",response?.data.expense)
      setExpenseData(response?.data.expense);
    } catch (err) {
      console.error("Data can not be fetched", err);
      // CORRECTED: Toast message
      toast.error("Could not fetch expense data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new expense entry
  const handleAddExpense = async (expense) => {
    try {
      const { category, amount, date, icon } = expense;
      if (!category.trim()) return toast.error("Category is required.");
      if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount should be a valid number greater than 0.");
      if (!date) return toast.error("Date is required.");

      await axios.post(`${serverUrl}/api/expense/add`, { category, amount, date, icon }, { withCredentials: true });
      setOpenAddExpenseModal(false);
      // CORRECTED: Toast message
      toast.success("Expense added successfully");
      FetchExpenseData();
    } catch (error) {
      console.error("Data can not be created", error);
      // CORRECTED: Toast message
      toast.error(error.response?.data?.message || "Failed to add expense.");
    }
  };

  // ✅ Delete expense entry
  const handleDeleteExpense = async () => {
    if (!openDeleteAlert.data) return;
    try {
      await axios.delete(`${serverUrl}/api/expense/delete/${openDeleteAlert.data}`, { withCredentials: true });
      // CORRECTED: Toast message
      toast.success("Expense deleted successfully");
      FetchExpenseData();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      // CORRECTED: Toast message
      toast.error(error.response?.data?.message || "Failed to delete expense.");
    } finally {
      setOpenDeleteAlert({ show: false, data: null });
    }
  };

  // ✅ Download Excel Report
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/expense/downloadExcel`, {
        withCredentials: true,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const formattedDate = new Date().toLocaleDateString('en-CA');
      // CORRECTED: Filename
      link.setAttribute('download', `Expense_Report_${formattedDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded!");
    } catch (error) {
      console.error("Error downloading excel:", error);
      toast.error("Could not download report.");
    }
  };

  useEffect(() => {
    FetchExpenseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='p-4 sm:p-6 lg:p-8 bg-gray-100 h-[calc(100vh-4rem)] overflow-y-auto'>
        <div className="max-w-7xl mx-auto space-y-6">
          <ExpensePageOverview
           transaction={expenseData}
           onAddExpense={()=> setOpenAddExpenseModal(true)}
          />

          <ExpenseList
           transaction={expenseData}
           onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
           onDownload={handleDownloadExpenseDetails}
          />
        </div>
      </div>

      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>      

      {/* ✅ Delete Confirmation Modal */}
      <DeleteConfirmationModal 
       isOpen={openDeleteAlert.show}
       onClose={() => setOpenDeleteAlert({ show: false, data: null })}
       onConfirm={handleDeleteExpense}
       title="Delete Expense"
       message="Are you sure you want to delete this expense record? This action cannot be undone."
      />
    </div>
  )
}

export default Expense;

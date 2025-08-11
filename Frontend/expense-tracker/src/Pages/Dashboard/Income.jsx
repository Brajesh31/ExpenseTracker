// /pages/Income.js

import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { serverDataContext } from '../../Context/ServerContext';
import IncomePageOverview from '../../Components/Income/IncomePageOverview';
import Modal from '../../Components/Income/Modal';
import AddIncomeForm from '../../Components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../Components/Income/IncomeList';
import DeleteConfirmationModal from '../../Components/Income/DeleteConfirmationModal';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const { serverUrl } = useContext(serverDataContext);

  // ✅ Fetch Income Data from Backend
  const FetchIncomeData = async () => {
    if (!loading) setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/api/income/all`, { withCredentials: true });
      setIncomeData(response?.data.incomes);
    } catch (err) {
      console.error("Data can not be fetched", err);
      toast.error("Could not fetch income data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new income entry
  const handleAddIncome = async (income) => {
    try {
      const { source, amount, date, icon } = income;
      if (!source.trim()) return toast.error("Source is required.");
      if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount should be a valid number greater than 0.");
      if (!date) return toast.error("Date is required.");

      await axios.post(`${serverUrl}/api/income/add`, { source, amount, date, icon }, { withCredentials: true });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      FetchIncomeData();
    } catch (error) {
      console.error("Data can not be created", error);
      toast.error(error.response?.data?.message || "Failed to add income.");
    }
  };

  // ✅ Delete income entry
  const handleDeleteIncome = async () => {
    if (!openDeleteAlert.data) return;
    try {
      await axios.delete(`${serverUrl}/api/income/delete/${openDeleteAlert.data}`, { withCredentials: true });
      toast.success("Income deleted successfully");
      FetchIncomeData();
    } catch (error) {
      console.error("Failed to delete income:", error);
      toast.error(error.response?.data?.message || "Failed to delete income.");
    } finally {
      setOpenDeleteAlert({ show: false, data: null });
    }
  };

  // ✅ Download Excel Report
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/income/downloadExcel`, {
        withCredentials: true,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const formattedDate = new Date().toLocaleDateString('en-CA');
      link.setAttribute('download', `Income_Report_${formattedDate}.xlsx`);
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
    FetchIncomeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='p-6 md:p-10 bg-gray-100 h-[calc(100vh-4rem)] overflow-y-auto'>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* ✅ Overview & Bar Chart */}
          <IncomePageOverview
            transaction={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          {/* ✅ Income List Table */}
          <IncomeList
            transaction={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
      </div>

      {/* ✅ Add Income Modal */}
      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      {/* ✅ Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        onConfirm={handleDeleteIncome}
        title="Delete Income"
        message="Are you sure you want to delete this income record? This action cannot be undone."
      />
    </div>
  );
};

export default Income;

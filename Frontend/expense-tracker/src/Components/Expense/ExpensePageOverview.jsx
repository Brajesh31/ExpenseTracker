import React, { useMemo } from 'react'
import CustomLineChart from "../../Charts/CustomLineChart"
const ExpensePageOverview = ({ transaction, onAddExpense }) => {

    const chartData = useMemo(() => {
        const grouped = {};

        transaction.forEach(({ amount, date }) => {
            const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
            });

            if (!grouped[formattedDate]) {
                grouped[formattedDate] = 0;
            }
            grouped[formattedDate] += parseFloat(amount);
        });

        return Object.keys(grouped).map((label) => ({
            label,
            amount: grouped[label],
        }));
    }, [transaction]);


    //  chart data show this 
//   [
//     { label: '27 Jul', amount: 300 },
//     { label: '25 Jul', amount: 120 },
//     { label: '20 Jul', amount: 450 },
//     { label: '15 Jul', amount: 800 },
//     { label: '10 Jul', amount: 1000 }
//   ]


    return (
        <div className='bg-gray-50 shadow-md rounded-xl p-4'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Expense Overview</h2>
                <button
                      onClick={onAddExpense}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 rounded"
                >
                    + Add Expense
                </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                Track your earnings over time and analyze your Expense trends
            </p>
            <CustomLineChart data={chartData} />
        </div>
    )
}

export default ExpensePageOverview
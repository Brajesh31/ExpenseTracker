const xlsx = require('xlsx');
const Expense = require('../models/expenseModel');

const addExpenseController = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is set by the Protect

        const { category , amount, date, icon } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            category,
            amount,
            date: new Date(date),
            userId,
            icon
        });
        await newExpense.save();

        res.status(201).json({
            message: "expense added successfully",
            expense: {
                id: newExpense._id,
                category: newExpense.category,
                amount: newExpense.amount,
                date: newExpense.date,
                icon: newExpense.icon
            }
        });
    } catch (error) {
        console.error("Error adding expense:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAllExpenseController = async (req, res) => {
    try {
        const userId = req.user.id;
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json({
            message: "expense fetched successfully",
            expense: expense.map(expense => ({
                id: expense._id,
                category: expense.category,
                amount: expense.amount,
                date: expense.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
                icon: expense.icon
            }))
        });
    } catch (err) {
        console.error("Error fetching expense:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const deleteExpenseController = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user._id;

        // First, find the income by ID
        const expense = await Expense.findById(expenseId);

        // Check if income exists and belongs to the logged-in user
        if (!expense || expense.userId.toString() !== userId.toString()) {
            return res.status(404).json({ message: "expense not found" });
        }

        // Delete the income
        await Expense.findByIdAndDelete(expenseId);

        res.status(200).json({ message: "expense deleted successfully" });
    } catch (err) {
        console.error("Error deleting expense:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


const downloadExccelController = async (req, res) => {
    try{
        const userId = req.user.id;

        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // know prepare data for excel
        const data = expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expenses');
        xlsx.writeFile(wb, 'Expenses_details.xlsx');
        res.download('Expenses_details.xlsx', (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                return res.status(500).json({ message: "Error downloading file" });
            }
        });
    }catch(err) {
        console.error("Error downloading excel:", err);
        return res.status(500).json({ message: "Internal server error" });
    }    
}



module.exports = {
    addExpenseController,
    getAllExpenseController,
    downloadExccelController,
    deleteExpenseController
};
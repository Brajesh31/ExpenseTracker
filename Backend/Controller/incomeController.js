const Income = require("../models/incomeModel.js")
const xlsx = require('xlsx');


const addIncomeController = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is set by the Protect

        const { source, amount, date, icon } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            source,
            amount,
            date: new Date(date),
            userId,
            icon
        });
        await newIncome.save();

        res.status(201).json({
            message: "Income added successfully",
            income: {
                id: newIncome._id,
                source: newIncome.source,
                amount: newIncome.amount,
                date: newIncome.date,
                icon: newIncome.icon
            }
        });
    } catch (error) {
        console.error("Error adding income:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAllIncomeController = async (req, res) => {
    try {
        const userId = req.user.id;
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json({
            message: "Incomes fetched successfully",
            incomes: incomes.map(income => ({
                id: income._id,
                source: income.source,
                amount: income.amount,
                date: income.date,
                icon: income.icon
            }))
        });
    } catch (err) {
        console.error("Error fetching income:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const downloadExccelController = async (req, res) => {
    try{
        const userId = req.user.id;

        const income = await Income.find({ userId }).sort({ date: -1 });

        // know prepare data for excel
        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Incomes');
        xlsx.writeFile(wb, 'Incomes_details.xlsx');
        res.download('Incomes_details.xlsx', (err) => {
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

const deleteIncomeController = async (req, res) => {
    try {
        const incomeId = req.params.id;
        const userId = req.user._id;

        // First, find the income by ID
        const income = await Income.findById(incomeId);

        // Check if income exists and belongs to the logged-in user
        if (!income || income.userId.toString() !== userId.toString()) {
            return res.status(404).json({ message: "Income not found" });
        }

        // Delete the income
        await Income.findByIdAndDelete(incomeId);

        res.status(200).json({ message: "Income deleted successfully" });
    } catch (err) {
        console.error("Error deleting income:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    addIncomeController,
    getAllIncomeController,
    downloadExccelController,
    deleteIncomeController
};
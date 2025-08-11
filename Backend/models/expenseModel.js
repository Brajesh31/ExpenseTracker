const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    icon : {
        type: String,   
    },
    amount : {
        type: Number,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now,
    },
} , { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
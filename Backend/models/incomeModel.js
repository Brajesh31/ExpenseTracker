const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    // basically source is from where the income is coming, like salary, business, etc.
    source : {
        type: String,
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    icon : {
        type: String,
    }
} , { timestamps : true }); 

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
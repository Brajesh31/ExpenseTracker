const express = require('express');
const { addExpenseController, getAllExpenseController, downloadExccelController , deleteExpenseController } = require('../Controller/expenseController');
const Protect = require('../middleware/isAuth');
const expenseRouter = express.Router();

expenseRouter.post('/add', Protect, addExpenseController);
expenseRouter.get('/all', Protect, getAllExpenseController);
expenseRouter.get('/downloadExcel' , Protect , downloadExccelController);
expenseRouter.delete('/delete/:id', Protect, deleteExpenseController);

module.exports = expenseRouter;
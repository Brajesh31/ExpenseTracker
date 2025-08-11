const express = require('express');
const { addIncomeController, getAllIncomeController, downloadExccelController , deleteIncomeController } = require('../Controller/incomeController');
const Protect = require('../middleware/isAuth');
const incomeRouter = express.Router();

incomeRouter.post('/add', Protect, addIncomeController);
incomeRouter.get('/all', Protect, getAllIncomeController);
incomeRouter.get('/downloadExcel' , Protect , downloadExccelController);
incomeRouter.delete('/delete/:id', Protect, deleteIncomeController);

module.exports = incomeRouter;
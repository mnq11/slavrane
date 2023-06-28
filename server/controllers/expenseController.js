
// controllers/expenseController.js
const { Expense } = require('../models/database');

exports.getAllExpenses = async (req, res) => {
    const expenses = await Expense.findAll();
    res.json(expenses);
};

exports.createExpense = async (req, res) => {
    const expense = await Expense.create(req.body);
    res.json(expense);
};
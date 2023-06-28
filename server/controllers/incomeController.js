
// controllers/incomeController.js
const { Income } = require('../models/database');

exports.getAllIncomes = async (req, res) => {
    const incomes = await Income.findAll();
    res.json(incomes);
};

exports.createIncome = async (req, res) => {
    const income = await Income.create(req.body);
    res.json(income);
};
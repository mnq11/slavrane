const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const expenseController = require('../controllers/expenseController')(models);

    router.post('/createExpense', expenseController.createExpense);
    router.put('/updateExpense/:id', expenseController.updateExpense);
    router.delete('/deleteExpense/:id', expenseController.deleteExpense);
    router.get('/family/:id', expenseController.getExpensesForMember);
    router.get('/member/:id', expenseController.getExpensesForMember);


    return router;
};

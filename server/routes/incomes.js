require('express');
module.exports = (models) => {
    const router = require('express').Router();
    const incomeController = require('../controllers/incomeController')(models);

    router.post('/createIncome', incomeController.createIncome);
    router.put('/updateIncome/:id', incomeController.updateIncome);
    router.delete('/deleteIncome/:id', incomeController.deleteIncome);
    router.get('/family/:id', incomeController.getIncomesForFamily);
    router.get('/member/:id', incomeController.getIncomeForMember);

    return router;
};

require('express');
module.exports = (models) => {
    const router = require('express').Router();
    const savingsController = require('../controllers/savingsController')(models);

    router.post('/createSaving', savingsController.createSavings);
    router.put('/updateSaving/:id', savingsController.updateSavings);
    router.delete('/deleteSaving/:id', savingsController.deleteSavings);
    router.get('/member/:id', savingsController.getSavingsForMember);
    router.get('/family/:id', savingsController.getSavingsForFamily);

    return router;
};

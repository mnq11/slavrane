require('express');
module.exports = (models) => {
    const router = require('express').Router();
    const savingsController = require('../controllers/savingsController')(models);

    router.post('/createSavings', savingsController.createSavings);
    router.put('/updateSavings/:id', savingsController.updateSavings);
    router.delete('/deleteSavings/:id', savingsController.deleteSavings);
    router.get('/member/:id', savingsController.getSavingsForFamily);

    return router;
};

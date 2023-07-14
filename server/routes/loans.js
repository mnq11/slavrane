require('express');
module.exports = (models) => {
    const router = require('express').Router();
    const loansController = require('../controllers/loansController')(models);

    router.post('/createLoan', loansController.createLoan);
    router.put('/updateLoan/:id', loansController.updateLoan);
    router.delete('/deleteLoan/:id', loansController.deleteLoan);
    router.get('/family/:id', loansController.getLoansForFamily);
    router.get('/member/:id', loansController.getLoansForMember);


    return router;
};

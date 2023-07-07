const express = require('express');
const router = express.Router();

module.exports = (models) => {
    router.get('/', async (req, res) => {
        const loans = await models.Loan.findAll();
        res.json(loans);
    });

    // Add other routes as needed

    return router;
};

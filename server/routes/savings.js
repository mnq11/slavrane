const express = require('express');
const router = express.Router();

module.exports = (models) => {
    router.get('/', async (req, res) => {
        const savings = await models.Savings.findAll();
        res.json(savings);
    });

    // Add other routes as needed

    return router;
};

const express = require('express');
const router = express.Router();

module.exports = (models) => {
    router.get('/', async (req, res) => {
        const resources = await models.Resource.findAll();
        res.json(resources);
    });

    // Add other routes as needed

    return router;
};

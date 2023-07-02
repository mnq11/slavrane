const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const taskController = require('../controllers/taskController')(models);

    router.post('/', taskController.createTask);

    return router;
};

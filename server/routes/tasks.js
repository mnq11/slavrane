// routes/tasks.js
module.exports = (models) => {
    const router = require('express').Router();
    const taskController = require('../controllers/taskController')(models);

    router.post('/', taskController.createTask);
    router.put('/:id', taskController.updateTask);
    router.delete('/:id', taskController.deleteTask);

    return router;
};

// routes/tasks.js
module.exports = (models) => {
    const router = require('express').Router();
    const taskController = require('../controllers/taskController')(models);

    router.post('/createTask', taskController.createTask);
    router.put('/updateTask/:id', taskController.updateTask);
    router.delete('/deleteTask/:id', taskController.deleteTask);
    router.get('/member/:id', taskController.getTasksForMember);
    return router;
};

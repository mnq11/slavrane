// controllers/taskController.js
const Joi = require('joi');

const createTaskSchema = Joi.object({
    Description: Joi.string().required(),
    DueDate: Joi.date().required(),
    Status: Joi.string().valid('Not Started','Pending', 'In Progress', 'Completed').required(),
    MemberID: Joi.number().integer().required(),
    // Add validation for other fields as needed
});

const updateTaskSchema = Joi.object({
    TaskID: Joi.number().integer().optional(),
    Description: Joi.string().optional(),
    DueDate: Joi.date().optional(),
    Status: Joi.string().valid('Not Started','Pending', 'In Progress', 'Completed').optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    MemberID: Joi.number().integer().optional(),
    // Add validation for other fields as needed
});


module.exports = (models) => {
    const { Task, Member } = models;

    async function createTask(req, res) {
        console.log('createTask function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = createTaskSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            // Destructure the request body
            const { MemberID, ...taskFields } = value;

            const member = await Member.findByPk(MemberID);
            if (!member) return res.status(404).json({message: 'Member not found.'});

            const task = await Task.create(taskFields);

            // Associate the task with the member
            await member.addTask(task);

            console.log('Task created:', task);
            res.json(task);
        } catch (error) {
            console.error('Error in createTask function:', error);
            res.status(500).json({message: 'An error occurred while creating the task.'});
        }
    }
    async function updateTask(req, res) {
        console.log('updateTask function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = updateTaskSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            const taskId = req.params.id;
            const task = await Task.findByPk(taskId);
            if (!task) return res.status(404).json({message: 'Task not found.'});

            await task.update(value);

            console.log('Task updated:', task);
            res.json(task);
        } catch (error) {
            console.error('Error in updateTask function:', error);
            res.status(500).json({message: 'An error occurred while updating the task.'});
        }
    }

    async function deleteTask(req, res) {
        console.log('deleteTask function called.', req.params);
        try {
            const taskId = req.params.id;
            const task = await Task.findByPk(taskId);
            if (!task) return res.status(404).json({message: 'Task not found.'});

            await task.destroy();

            console.log('Task deleted:', task);
            res.json({message: 'Task deleted successfully.'});
        } catch (error) {
            console.error('Error in deleteTask function:', error);
            res.status(500).json({message: 'An error occurred while deleting the task.'});
        }
    }

    return {
        createTask,
        updateTask,
        deleteTask,
        // Add other task controller methods as needed
    };
};

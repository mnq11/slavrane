// controllers/taskController.js
const Joi = require('joi');

const createTaskSchema = Joi.object({
    Description: Joi.string().required(),
    DueDate: Joi.date().required(),
    TaskStatus: Joi.string().valid('Not Started','Pending', 'In Progress', 'Completed').required(),
    MemberID: Joi.number().integer().required(),
    TaskName: Joi.string().required(),
    Priority: Joi.string().required(),
    // Add validation for other fields as needed
});

const updateTaskSchema = Joi.object({
    TaskID: Joi.number().integer().optional(),
    TaskName: Joi.string().optional(),
    Description: Joi.string().optional(),
    MemberID: Joi.number().integer().required(),

    DueDate: Joi.date().optional(),
    TaskStatus: Joi.string().valid('Not Started','Pending', 'In Progress', 'Completed').optional(),
    Priority: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
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

            const { MemberID } = value;

            const member = await Member.findByPk(MemberID);
            if (!member) return res.status(404).json({message: 'Member not found.'});

            const task = await Task.create(value);
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

            // Only check if the member exists if a new MemberID was provided in the request
            if (value.MemberID) {
                const member = await Member.findByPk(value.MemberID);
                if (!member) return res.status(404).json({message: 'Member not found.'});
            }

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
    async function getTasksForMember(req, res) {
        console.log('getTasksForMember function called.', req.params);
        try {
            const memberId = req.params.id;
            const tasks = await Task.findAll({ where: { MemberID: memberId } });
            if (!tasks) return res.status(404).json({message: 'Tasks not found.'});
            res.json(tasks);
        } catch (error) {
            console.error('Error in getTasksForMember function:', error);
            res.status(500).json({message: 'An error occurred while getting tasks for the member.'});
        }
    }




    return {
        createTask,
        updateTask,
        deleteTask,
        getTasksForMember,
        // Add other task controller methods as needed
    };
};

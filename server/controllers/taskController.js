const Joi = require('joi');

// Input validation schema
const createTaskSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    DueDate: Joi.date().required()
});

module.exports = (models) => {
    const { Task } = models;

    async function createTask(req, res) {
        try {
            // Validate the request body
            const { error, value } = createTaskSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            // Create the task
            const task = await Task.create(value);
            res.json(task);
        } catch (error) {
            console.error('Error in createTask function:', error);
            res.status(500).json({message: 'An error occurred while creating the task.'});
        }
    }

    return {
        createTask
    };
};

// controllers/taskController.js
const Joi = require('joi');


const createTaskSchema = Joi.object({
    Description: Joi.string().required().messages({
        'string.empty': 'الوصف مطلوب',
    }),
    DueDate: Joi.date().required().messages({
        'date.base': 'تاريخ الاستحقاق مطلوب',
        'date.format': 'تنسيق تاريخ الاستحقاق غير صالح',
    }),
    TaskStatus: Joi.string().valid('لم يبدأ', 'قيد الانتظار', 'قيد التنفيذ', 'مكتمل').required().messages({
        'any.only': 'الحالة غير صالحة',
        'string.empty': 'الحالة مطلوبة',
    }),
    MemberID: Joi.number().integer().required().messages({
        'number.base': 'رقم العضو غير صالح',
        'number.integer': 'رقم العضو يجب أن يكون صحيحًا',
        'number.empty': 'رقم العضو مطلوب',
    }),
    TaskName: Joi.string().required().messages({
        'string.empty': 'اسم المهمة مطلوب',
    }),
    Priority: Joi.number().required().messages({
        'number.base': 'الأولوية غير صالحة',
        'number.empty': 'الأولوية مطلوبة',
    }),
    // Add validation for other fields as needed
});

const updateTaskSchema = Joi.object({
    TaskID: Joi.number().integer().optional().messages({
        'number.base': 'رقم المهمة غير صالح',
        'number.integer': 'رقم المهمة يجب أن يكون صحيحًا',
    }),
    TaskName: Joi.string().optional().messages({
        'string.empty': 'اسم المهمة مطلوب',
    }),
    Description: Joi.string().optional().messages({
        'string.empty': 'الوصف مطلوب',
    }),
    MemberID: Joi.number().integer().required().messages({
        'number.base': 'رقم العضو غير صالح',
        'number.integer': 'رقم العضو يجب أن يكون صحيحًا',
        'number.empty': 'رقم العضو مطلوب',
    }),
    DueDate: Joi.date().optional().messages({
        'date.base': 'تاريخ الاستحقاق غير صالح',
        'date.format': 'تنسيق تاريخ الاستحقاق غير صالح',
    }),
    TaskStatus: Joi.string().valid('لم يبدأ', 'قيد الانتظار', 'قيد التنفيذ', 'مكتمل').optional().messages({
        'any.only': 'الحالة غير صالحة',
    }),
    Priority: Joi.number().optional().messages({
        'number.base': 'الأولوية غير صالحة',
    }),
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
            const taskId = req.params.id; // corrected from `req.paraams.id`
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

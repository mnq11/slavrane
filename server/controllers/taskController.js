// controllers/taskController.js
const { Task } = require('../models/database');

exports.getAllTasks = async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
};
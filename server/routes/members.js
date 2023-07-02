// routes/members.js
const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const memberController = require('../controllers/memberController')(models);

    router.post('/register', memberController.createMember);
    router.post('/login', memberController.loginMember);
    router.get('/families', memberController.getAllFamilies);
    router.get('/families/:id', memberController.getMembersByFamilyId);
    router.get('/:id/tasks', memberController.getMemberTasks);
    router.get('/:id/resources', memberController.getMemberResources);
    router.get('/:id/incomes', memberController.getMemberIncomes);
    router.get('/:id/expenses', memberController.getMemberExpenses);
    router.get('/:id/family', memberController.getMemberFamily);
    router.get('/:id/roles', memberController.getMemberRoles);
    router.get('/:id/savings', memberController.getMemberSavings);
    router.get('/:id/skills', memberController.getMemberSkills);

    return router;
};

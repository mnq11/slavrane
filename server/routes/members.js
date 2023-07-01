// routes/members.js
const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const memberController = require('../controllers/memberController')(models);

    router.get('/', memberController.getAllMembers);
    router.post('/register', memberController.createMember); // Changed from '/' to '/register'
    router.delete('/:MemberID', memberController.deleteMember);
    router.post('/login', memberController.loginMember);
    router.put('/:MemberID', memberController.updateMember);

    return router;
};

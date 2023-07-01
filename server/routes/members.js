// routes/members.js
const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const memberController = require('../controllers/memberController')(models);

    router.get('/', memberController.getAllMembers);
    router.post('/register', memberController.createMember);


    return router;
};

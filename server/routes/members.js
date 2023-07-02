// routes/members.js
const express = require('express');
const api = require("../../src/API/api");
const router = express.Router();

module.exports = (models) => {
    const memberController = require('../controllers/memberController')(models);

    router.post('/register', memberController.createMember);
    router.post('/login', memberController.loginMember);
    router.get('/families', memberController.getAllFamilies);
    router.get('/families/:id', memberController.getMembersByFamilyId); // Add this line

    return router;
};

// routes/members.js
const express = require('express');
const {getAllFamilies} = require("../../src/API/api");
const router = express.Router();

module.exports = (models) => {
    const memberController = require('../controllers/memberController')(models);

    router.post('/register', memberController.createMember);
    router.post('/login', memberController.loginMember);
    router.get('/admin', memberController.getAllFamilies);


    return router;
};

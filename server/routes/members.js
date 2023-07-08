// routes/members.js
const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const memberController = require('../controllers/memberController')(models);


    router.post('/', memberController.createMember);
    router.post('/login', memberController.loginMember);
    router.get('/families/:familyId', memberController.getAllMembersByFamilyId); // <-- Here's the change
    router.get('/:id', memberController.getOneMemberHisID);
    router.put('/:id', memberController.updateMember);
    router.delete('/:id', memberController.deleteMember);
    return router;
};

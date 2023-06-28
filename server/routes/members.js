// routes/members.js
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/', memberController.getAllMembers);
router.post('/register', memberController.createMember); // Changed from '/' to '/register'
router.delete('/:MemberID', memberController.deleteMember);
router.post('/login', memberController.loginMember);
router.put('/:MemberID', memberController.updateMember);

module.exports = router;

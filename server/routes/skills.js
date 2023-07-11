require('express');
module.exports = (models) => {
    const router = require('express').Router();
    const skillController = require('../controllers/skillController')(models);

    router.post('/createSkill', skillController.createSkill);
    router.put('/updateSkill/:id', skillController.updateSkill);
    router.delete('/deleteSkill/:id', skillController.deleteSkill);
    router.get('/member/:id', skillController.getSkillsForMember);

    return router;
};

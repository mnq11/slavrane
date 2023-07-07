const express = require('express');
const router = express.Router();

module.exports = (models) => {
    router.get('/', async (req, res) => {
        const skills = await models.Skill.findAll();
        res.json(skills);
    });

    // Add other routes as needed

    return router;
};

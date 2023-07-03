const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const familyController = require('../controllers/familyController')(models);

    router.get('/', familyController.getAllFamilies);
    router.post('/', familyController.createFamily);
    router.put('/:id', familyController.updateFamily);
    router.delete('/:id', familyController.deleteFamily);

    return router;
};

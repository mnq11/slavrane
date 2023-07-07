const express = require('express');
const router = express.Router();

module.exports = (models) => {
    const familyController = require('../controllers/familyController')(models);

    router.get('/getFamilies', familyController.getAllFamilies);
    router.get('/:id', familyController.getOneFamily);
    router.post('/', familyController.createFamily);
    router.put('/:id', familyController.updateFamily);
    router.delete('/:id', familyController.deleteFamily);

    return router;
};


require('express');
module.exports = (models) => {
    const router = require('express').Router();
    const resourcesController = require('../controllers/resourcesController')(models);

    router.post('/createResource', resourcesController.createResource);
    router.put('/updateResource/:id', resourcesController.updateResource);
    router.delete('/deleteResource/:id', resourcesController.deleteResource);
    router.get('/member/:id', resourcesController.getResourcesForFamily);

    return router;
};


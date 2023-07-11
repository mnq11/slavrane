const Joi = require('joi');

const createResourceSchema = Joi.object({
    FamilyID: Joi.number().required(),
    MemberID: Joi.number().required(),
    ResourceName: Joi.string().required(),
    ResourceValue: Joi.number().required(),
    ResourceDescription: Joi.string().required(),
    DateAcquired: Joi.date().iso().required(),
});

const updateResourceSchema = Joi.object({
    ResourceID: Joi.number().integer().optional(),
    FamilyID: Joi.number().integer().required(),
    ResourceName: Joi.string().required(),
    ResourceValue: Joi.number().required(),
    ResourceDescription: Joi.string().optional(),
    DateAcquired: Joi.date().required(),
});

module.exports = (models) => {
    const { Resource } = models;

    async function createResource(req, res) {
        console.log('createResource function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = createResourceSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            const resource = await Resource.create(value);
            console.log('Resource created:', resource);
            res.json(resource);
        } catch (error) {
            console.error('Error in createResource function:', error);
            res.status(500).json({ message: 'An error occurred while creating the resource.' });
        }
    }

    async function updateResource(req, res) {
        console.log('updateResource function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = updateResourceSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            const resourceId = req.params.id;
            const resource = await Resource.findByPk(resourceId);
            if (!resource) return res.status(404).json({ message: 'Resource not found.' });

            await resource.update(value);

            console.log('Resource updated:', resource);
            res.json(resource);
        } catch (error) {
            console.error('Error in updateResource function:', error);
            res.status(500).json({ message: 'An error occurred while updating the resource.' });
        }
    }

    async function deleteResource(req, res) {
        console.log('deleteResource function called.', req.params);
        try {
            const resourceId = req.params.id;
            const resource = await Resource.findByPk(resourceId);
            if (!resource) return res.status(404).json({ message: 'Resource not found.' });

            await resource.destroy();

            console.log('Resource deleted:', resource);
            res.json({ message: 'Resource deleted successfully.' });
        } catch (error) {
            console.error('Error in deleteResource function:', error);
            res.status(500).json({ message: 'An error occurred while deleting the resource.' });
        }
    }

    async function getResourcesForFamily(req, res) {
        console.log('getResourcesForFamily function called.', req.params);
        try {
            const familyId = req.params.id;
            const resources = await Resource.findAll({ where: { FamilyID: familyId } });
            if (!resources) return res.status(404).json({ message: 'Resources not found.' });
            res.json(resources);
        } catch (error) {
            console.error('Error in getResourcesForFamily function:', error);
            res.status(500).json({ message: 'An error occurred while getting resources for the family.' });
        }
    }

    return {
        createResource,
        updateResource,
        deleteResource,
        getResourcesForFamily,
    };
};

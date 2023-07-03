module.exports = (models) => {
    async function getAllFamilies(req, res) {
        try {
            const families = await models.Family.findAll();
            res.json({ families });
        } catch (error) {
            console.error('Error in getAllFamilies function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    async function createFamily(req, res) {
        try {
            const family = await models.Family.create(req.body);
            res.json(family);
        } catch (error) {
            console.error('Error in createFamily function:', error);
            res.status(500).json({ message: 'An error occurred while creating the family.' });
        }
    }

    async function updateFamily(req, res) {
        try {
            const familyId = req.params.id;
            const family = await models.Family.findByPk(familyId);
            if (!family) return res.status(404).json({message: 'Family not found.'});

            const updatedFamily = await family.update(req.body);
            res.json(updatedFamily);
        } catch (error) {
            console.error('Error in updateFamily function:', error);
            res.status(500).json({ message: 'An error occurred while updating the family.' });
        }
    }


    async function deleteFamily(req, res) {
        try {
            const familyId = req.params.id;
            const family = await models.Family.findByPk(familyId);
            if (!family) return res.status(404).json({ message: 'Family not found.' });
            await family.destroy();
            res.json({ message: 'Family deleted.' });
        } catch (error) {
            console.error('Error in deleteFamily function:', error);
            res.status(500).json({ message: 'An error occurred while deleting the family.' });
        }
    }


    return {
        getAllFamilies,
        createFamily,
        updateFamily,
        deleteFamily
    };
};

const Joi = require('joi');

const createSavingsSchema = Joi.object({
    FamilyID: Joi.number().integer().required(),
    Amount: Joi.number().required(),
    Date: Joi.date().required(),
    SavingsGoal: Joi.number().required(),
    TargetDate: Joi.date().optional(),
});

const updateSavingsSchema = Joi.object({
    SavingsID: Joi.number().integer().optional(),
    FamilyID: Joi.number().integer().required(),
    Amount: Joi.number().required(),
    Date: Joi.date().required(),
    SavingsGoal: Joi.number().required(),
    TargetDate: Joi.date().optional(),
});

module.exports = (models) => {
    const { Savings } = models;

    async function createSavings(req, res) {
        console.log('createSavings function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = createSavingsSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            const savings = await Savings.create(value);
            console.log('Savings created:', savings);
            res.json(savings);
        } catch (error) {
            console.error('Error in createSavings function:', error);
            res.status(500).json({ message: 'An error occurred while creating the savings.' });
        }
    }

    async function updateSavings(req, res) {
        console.log('updateSavings function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = updateSavingsSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            const savingsId = req.params.id;
            const savings = await Savings.findByPk(savingsId);
            if (!savings) return res.status(404).json({ message: 'Savings not found.' });

            await savings.update(value);

            console.log('Savings updated:', savings);
            res.json(savings);
        } catch (error) {
            console.error('Error in updateSavings function:', error);
            res.status(500).json({ message: 'An error occurred while updating the savings.' });
        }
    }

    async function deleteSavings(req, res) {
        console.log('deleteSavings function called.', req.params);
        try {
            const savingsId = req.params.id;
            const savings = await Savings.findByPk(savingsId);
            if (!savings) return res.status(404).json({ message: 'Savings not found.' });

            await savings.destroy();

            console.log('Savings deleted:', savings);
            res.json({ message: 'Savings deleted successfully.' });
        } catch (error) {
            console.error('Error in deleteSavings function:', error);
            res.status(500).json({ message: 'An error occurred while deleting the savings.' });
        }
    }

    async function getSavingsForFamily(req, res) {
        console.log('getSavingsForFamily function called.', req.params);
        try {
            const familyId = req.params.id;
            const savings = await Savings.findAll({ where: { FamilyID: familyId } });
            if (!savings) return res.status(404).json({ message: 'Savings not found.' });
            res.json(savings);
        } catch (error) {
            console.error('Error in getSavingsForFamily function:', error);
            res.status(500).json({ message: 'An error occurred while getting savings for the family.' });
        }
    }
    async function getSavingsForMember (req, res) {
        console.log('getSavingsForMember function called.', req.params);
        try {
            const memberId = req.params.id;
            const savings = await Savings.findAll({ where: { MemberID: memberId } });
            if (!savings) return res.status(404).json({ message: 'Savings not found.' });
            res.json(savings);
        } catch (error) {
            console.error('Error in getSavingsForMember function:', error);
            res.status(500).json({ message: 'An error occurred while getting savings for the member.' });
        }
    }

    return {
        createSavings,
        updateSavings,
        deleteSavings,
        getSavingsForMember,
        getSavingsForFamily,

    };
};

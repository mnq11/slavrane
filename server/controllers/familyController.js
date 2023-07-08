const { check, validationResult } = require('express-validator');

module.exports = (models) => {
    return {
        getAllFamilies: async (req, res) => {
            try {
                const families = await models.Family.findAll();
                res.json(families);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },

        getOneFamily: async (req, res) => {
            try {
                const family = await models.Family.findByPk(req.params.id);
                if (family) {
                    res.json(family);
                } else {
                    res.status(404).json({ message: 'Family not found' });
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },

        createFamily: [
            // Validation middleware
            check('FamilyName').notEmpty().withMessage('Family name is required'),
            check('Address').notEmpty().withMessage('Address is required'),
            check('ContactNumber').notEmpty().withMessage('Contact number is required'),

            async (req, res) => {
                console.log(req.body);

                // Check the result of the validation
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    // If there are validation errors, send a 400 Bad Request response with the errors
                    return res.status(400).json({ errors: errors.array() });
                }

                try {
                    const family = await models.Family.create(req.body);
                    res.status(201).json(family);
                } catch (err) {
                    // Check if the error is a Sequelize validation error
                    if (err.name === 'SequelizeValidationError') {
                        // If it is, send a 400 Bad Request response with the validation errors
                        return res.status(400).json({ errors: err.errors.map(e => e.message) });
                    }

                    // If it's not a validation error, send a 500 Internal Server Error response with the error message
                    res.status(500).json({ message: err.message });
                }
            }
        ],

        updateFamily: async (req, res) => {
            console.log(req.body);

            try {
                const family = await models.Family.findByPk(req.params.id);
                if (family) {
                    await family.update(req.body);
                    res.json(family);
                } else {
                    res.status(404).json({ message: 'Family not found' });
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },

        deleteFamily: async (req, res) => {
            try {
                const family = await models.Family.findByPk(req.params.id);
                if (family) {
                    await family.destroy();
                    res.json({ message: 'Family deleted' });
                } else {
                    res.status(404).json({ message: 'Family not found' });
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
    };
};

// memberController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Input validation schema
const createMemberSchema = Joi.object({
    Password: Joi.string().required(),
    FamilyID: Joi.number().integer().required(),
    RoleID: Joi.number().integer().optional(),
    Email: Joi.string().email().required(),
    FullName: Joi.string().required(),
    DateOfBirth: Joi.date().required(),
    PhoneNumber: Joi.string().required(),
    // Add validation for other fields as needed
});


module.exports = (models) => {
    const { Member, Family } = models;

    async function getAllMembers(req, res) {
        const members = await Member.findAll();
        res.json(members);
    }

    // This function handles the registration of a new member
// This function handles the registration of a new member
    async function createMember(req, res, next) {
        console.log('createMember function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = createMemberSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            // Destructure the request body
            const { Password, FamilyID, RoleID, Email, ...otherFields } = value;

            const family = await Family.findByPk(FamilyID);
            if (!family) return res.status(404).json({message: 'Family not found.'});

            // Check if email already exists
            const existingMember = await Member.findOne({ where: { Email } });
            if (existingMember) return res.status(400).json({message: 'Email already in use.'});

            const hashedPassword = await bcrypt.hash(Password, 10);
            const memberData = { Password: hashedPassword, FamilyID, Email, ...otherFields };
            if (RoleID) memberData.RoleID = RoleID; // Only include RoleID if it was provided
            const member = await Member.create(memberData);
            console.log('Member created:', member);
            res.json(member);
        } catch (error) {
            console.error('Error in createMember function:', error);
            res.status(500).json({message: 'An error occurred while creating the member.'});
        }
    }

    return {
        getAllMembers,
        createMember,
    };
};

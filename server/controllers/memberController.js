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

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


module.exports = (models) => {
    const { Member, Family ,} = models;

    async function getAllFamilies(req, res) {
        try {
            const families = await models.Family.findAll();
            res.json({ families });
        } catch (error) {
            console.error('Error in getAllFamilies function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }
    async function getMembersByFamilyId(req, res) {
        try {
            const familyId = req.params.id;
            const members = await models.Member.findAll({ where: { FamilyID: familyId } });
            res.json({ members });
        } catch (error) {
            console.error('Error in getMembersByFamilyId function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

// memberController.js

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

// This function handles the login process
    async function loginMember(req, res, next) {
        console.log('loginMember function called.', req.body);
        const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { email, password } = value;

        try {
            const member = await Member.findOne({
                where: { Email: email },
                include: [
                    { model: models.Family },
                    { model: models.Role },
                    { model: models.Task },
                    { model: models.Resource },
                    { model: models.Skill },
                    { model: models.Income },
                    { model: models.Expense },
                    { model: models.Savings }
                    // Include other related models as needed
                ]
            });
            if (!member) return res.status(400).json({ message: 'Invalid email or password.' });

            const validPassword = await bcrypt.compare(password, member.Password); // Adjusted to match case
            if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

            const token = jwt.sign({ id: member.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const memberPlain = member.get({
                plain: true,
                include: [
                    { model: models.Family },
                    { model: models.Role },
                    { model: models.Tasks },
                    { model: models.Resources },
                    { model: models.Skills },
                    { model: models.Incomes },
                    { model: models.Expenses },
                    { model: models.Savings }
                ]
            });

            res.json({ token, member: memberPlain });
        } catch (error) {
            console.error('Error in loginMember function:', error);
            res.status(500).json({ message: 'An error occurred while logging in.' });
        }
    }
    async function getMemberTasks(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const tasks = await member.getTasks();
            res.json({ tasks });
        } catch (error) {
            console.error('Error in getMemberTasks function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    async function getMemberResources(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const resources = await member.getResources();
            res.json({ resources });
        } catch (error) {
            console.error('Error in getMemberResources function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    async function getMemberIncomes(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const incomes = await member.getIncomes();
            res.json({ incomes });
        } catch (error) {
            console.error('Error in getMemberIncomes function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }
    async function getMemberExpenses(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const expenses = await member.getExpenses();
            res.json({ expenses });
        } catch (error) {
            console.error('Error in getMemberExpenses function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    async function getMemberFamily(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const family = await member.getFamily();
            res.json({ family });
        } catch (error) {
            console.error('Error in getMemberFamily function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    async function getMemberRoles(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const roles = await member.getRoles();
            res.json({ roles });
        } catch (error) {
            console.error('Error in getMemberRoles function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    async function getMemberSavings(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const savings = await member.getSavings();
            res.json({ savings });
        } catch (error) {
            console.error('Error in getMemberSavings function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    async function getMemberSkills(req, res) {
        try {
            const memberId = req.params.id;
            const member = await models.Member.findByPk(memberId);
            const skills = await member.getSkills();
            res.json({ skills });
        } catch (error) {
            console.error('Error in getMemberSkills function:', error);
            res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
    }

    return {
        createMember,
        loginMember,
        getAllFamilies,
        getMembersByFamilyId,
        getMemberTasks,
        getMemberResources,
        getMemberIncomes,
        getMemberExpenses,
        getMemberFamily,
        getMemberRoles,
        getMemberSavings,
        getMemberSkills,
    };

};
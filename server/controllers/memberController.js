// memberController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (models) => {
    const { Member, Family, Role } = models;

    async function getAllMembers(req, res) {
        const members = await Member.findAll();
        res.json(members);
    }

    // This function handles the registration of a new member
    async function createMember(req, res) {
        try {
            // Log the incoming request body
            console.log('createMember function called with req.body:', req.body);

            // Destructure the request body
            const { Password, FamilyID, RoleID, Email, ...otherFields } = req.body;

            // Validate the RoleID
            if (!RoleID || isNaN(RoleID)) {
                return res.status(400).json({message: 'Invalid RoleID.'});
            }

            const family = await Family.findByPk(FamilyID);
            if (!family) return res.status(404).json({message: 'Family not found.'});

            const role = await Role.findByPk(RoleID);
            if (!role) return res.status(404).json({message: 'Role not found.'});

            // Check if email already exists
            const existingMember = await Member.findOne({ where: { Email } });
            if (existingMember) return res.status(400).json({message: 'Email already in use.'});

            const hashedPassword = await bcrypt.hash(Password, 10);
            const member = await Member.create({ Password: hashedPassword, FamilyID, RoleID, Email, ...otherFields });
            console.log('Member created:', member);
            res.json(member);
        } catch (error) {
            console.error('Error in createMember function:', error);
            res.status(500).json({message: 'An error occurred while creating the member.'});
        }
    }

    async function deleteMember(req, res) {
        const { MemberID } = req.params;
        const member = await Member.findByPk(MemberID);
        if (!member) return res.status(404).json({message: 'Member not found.'});

        await member.destroy();
        res.json({message: 'Member deleted.'});
    }

    async function loginMember(req, res) {
        const { Email, Password } = req.body;
        const member = await Member.findOne({ where: { Email } });
        if (!member) return res.status(404).json({message: 'Member not found.'});

        const validPassword = await bcrypt.compare(Password, member.Password);
        if (!validPassword) return res.status(401).json({message: 'Invalid password.'});

        const token = jwt.sign({ MemberID: member.MemberID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, MemberID: member.MemberID, member });
    }

    async function updateMember(req, res) {
        const { MemberID } = req.params;
        const member = await Member.findByPk(MemberID);
        if (!member) return res.status(404).json({message: 'Member not found.'});

        const { Password, ...otherFields } = req.body;
        if (Password) {
            member.Password = await bcrypt.hash(Password, 10);
        }
        Object.assign(member, otherFields);
        await member.save();
        res.json(member);
    }

    return {
        getAllMembers,
        createMember,
        deleteMember,
        loginMember,
        updateMember
    };
};

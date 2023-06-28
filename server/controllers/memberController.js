// controllers/memberController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const initDatabase = require('../models/database');

let Member;

initDatabase().then(models => {  // Call initDatabase() to get a Promise
    Member = models.Member;
});

exports.getAllMembers = async (req, res) => {
    const members = await Member.findAll();
    res.json(members);
};

exports.createMember = async (req, res) => {
    const { Password, FamilyID, RoleID, ...otherFields } = req.body;

    if (!RoleID || isNaN(RoleID)) {
        return res.status(400).json({message: 'Invalid RoleID.'});
    }

    const family = await Family.findByPk(FamilyID);
    if (!family) return res.status(404).json({message: 'Family not found.'});

    const role = await Role.findByPk(RoleID);
    if (!role) return res.status(404).json({message: 'Role not found.'});

    const hashedPassword = await bcrypt.hash(Password, 10);
    const member = await Member.create({ Password: hashedPassword, FamilyID, RoleID, ...otherFields });
    res.json(member);
};


exports.deleteMember = async (req, res) => {
    const { MemberID } = req.params;
    const member = await Member.findByPk(MemberID);
    if (!member) return res.status(404).json({message: 'Member not found.'});

    await member.destroy();
    res.json({message: 'Member deleted.'});
};

exports.loginMember = async (req, res) => {
    const { Email, Password } = req.body;
    const member = await Member.findOne({ where: { Email } });
    if (!member) return res.status(404).json({message: 'Member not found.'});

    const validPassword = await bcrypt.compare(Password, member.Password);
    if (!validPassword) return res.status(401).json({message: 'Invalid password.'});

    const token = jwt.sign({ MemberID: member.MemberID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, MemberID: member.MemberID, member });
};

exports.updateMember = async (req, res) => {
    const { MemberID } = req.params;
    const member = await Member.findByPk(MemberID);
    if (!member) return res.status(404).json({message: 'Member not found.'});

    const { Password, ...otherFields } = req.body;
    if (Password) {
        const hashedPassword = await bcrypt.hash(Password, 10);
        member.Password = hashedPassword;
    }
    Object.assign(member, otherFields);
    await member.save();
    res.json(member);
};

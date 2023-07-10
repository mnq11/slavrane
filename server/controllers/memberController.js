// controllers/memberController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (models) => {

    const createMember = async (req, res) => {
        try {
            const { FamilyID, MemberName, Role, score, DateOfBirth, Gender, Email, Password, ContactNumber } = req.body;

            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(Password, saltRounds);

            const newMember = await models.Member.create({
                FamilyID,
                Role,
                MemberName,
                DateOfBirth,
                Gender,
                Email,
                Password: hashedPassword,
                ContactNumber,
                score
            });

            res.status(201).json(newMember);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating new member' });
        }
    };


    const loginMember = async (req, res) => {
        console.log(req.body);
        try {
            const { email, password } = req.body;

            const member = await models.Member.findOne({ where: { Email: email } });

            if (!member) {
                return res.status(401).json({ message: 'No such user found' });
            }

            const match = await bcrypt.compare(password, member.Password); // Use 'password' instead of 'Password'
            if (match) {
                // Passwords match
                const token = jwt.sign({ id: member.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.status(200).json({ token, member });

                // Generate token and send it back
            } else {
                // Passwords don't match
                console.log('Password is incorrect');
                return res.status(401).json({ message: 'Password is incorrect' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error logging in' });
        }
    };
    const getAllMembersByFamilyId = async (req, res) => {
        try {
            const members = await models.Member.findAll({
                where: {
                    FamilyID: req.params.familyId
                }
            });
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving members', error });
        }
    };

    const getOneMemberHisID = async (req, res) => {
        try {
            const member = await models.Member.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (member) {
                res.status(200).json(member);
            } else {
                res.status(404).json({ message: 'Member not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving member', error });
        }
    };

    const updateMember = async (req, res) => {
        console.log(req.body);
        try {
            const updated = await models.Member.update(req.body, {
                where: {
                    MemberID: req.params.id
                }
            });
            if (updated) {
                res.status(200).json({ message: 'Member updated' });
            } else {
                res.status(404).json({ message: 'Member not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating member', error });
        }
    };

    const deleteMember = async (req, res) => {
        console.log(req.params.id);
        try {
            const deleted = await models.Member.destroy({
                where: {
                    MemberID: req.params.id
                }
            });
            if (deleted) {
                res.status(200).json({ message: 'Member deleted' });
            } else {
                res.status(404).json({ message: 'Member not found' });
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: 'Error deleting member', error });
        }
    };


    return {
        createMember,
        loginMember,
        getAllMembersByFamilyId,
        getOneMemberHisID,
        updateMember,
        deleteMember
    };
};

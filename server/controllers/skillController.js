const Joi = require('joi');

const createSkillSchema = Joi.object({
    SkillName: Joi.string().required(),
    SkillLevel: Joi.number().required(),
    DateAcquired: Joi.date().required(),
    Certification: Joi.string().required(),
    MemberID: Joi.number().integer().required(),
});

const updateSkillSchema = Joi.object({
    SkillID: Joi.number().integer().optional(),
    SkillName: Joi.string().optional(),
    SkillLevel: Joi.number().optional(),
    DateAcquired: Joi.date().optional(),
    Certification: Joi.string().optional(),
    MemberID: Joi.number().integer().required(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
});

module.exports = (models) => {
    const { Skill, Member } = models;

    async function createSkill(req, res) {
        console.log('createSkill function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = createSkillSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            const { MemberID } = value;

            const member = await Member.findByPk(MemberID);
            if (!member) return res.status(404).json({ message: 'Member not found.' });

            const skill = await Skill.create(value);
            console.log('Skill created:', skill);
            res.json(skill);
        } catch (error) {
            console.error('Error in createSkill function:', error);
            res.status(500).json({ message: 'An error occurred while creating the skill.' });
        }
    }

    async function updateSkill(req, res) {
        console.log('updateSkill function called.', req.body);
        try {
            // Validate the request body
            const { error, value } = updateSkillSchema.validate(req.body);
            if (error) throw { status: 400, message: error.details[0].message };

            const skillId = req.params.id;
            const skill = await Skill.findByPk(skillId);
            if (!skill) return res.status(404).json({ message: 'Skill not found.' });

            // Only check if the member exists if a new MemberID was provided in the request
            if (value.MemberID) {
                const member = await Member.findByPk(value.MemberID);
                if (!member) return res.status(404).json({ message: 'Member not found.' });
            }

            await skill.update(value);

            console.log('Skill updated:', skill);
            res.json(skill);
        } catch (error) {
            console.error('Error in updateSkill function:', error);
            res.status(500).json({ message: 'An error occurred while updating the skill.' });
        }
    }

    async function deleteSkill(req, res) {
        console.log('deleteSkill function called.', req.params);
        try {
            const skillId = req.params.id;
            const skill = await Skill.findByPk(skillId);
            if (!skill) return res.status(404).json({ message: 'Skill not found.' });

            await skill.destroy();

            console.log('Skill deleted:', skill);
            res.json({ message: 'Skill deleted successfully.' });
        } catch (error) {
            console.error('Error in deleteSkill function:', error);
            res.status(500).json({ message: 'An error occurred while deleting the skill.' });
        }
    }

    async function getSkillsForMember(req, res) {
        console.log('getSkillsForMember function called.', req.params);
        try {
            const memberId = req.params.id;
            const skills = await Skill.findAll({ where: { MemberID: memberId } });
            if (!skills) return res.status(404).json({ message: 'Skills not found.' });
            res.json(skills);
        } catch (error) {
            console.error('Error in getSkillsForMember function:', error);
            res.status(500).json({ message: 'An error occurred while getting skills for the member.' });
        }
    }

    return {
        createSkill,
        updateSkill,
        deleteSkill,
        getSkillsForMember,
        // Add other skill controller methods as needed
    };
};

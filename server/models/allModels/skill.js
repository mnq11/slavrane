// models/skill.js
module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('Skill', {
        SkillID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MemberID: DataTypes.INTEGER,
        SkillName: DataTypes.STRING,
        SkillLevel: DataTypes.STRING,
        DateAcquired: DataTypes.DATE,
        Certification: DataTypes.STRING
    });

    return Skill;
};

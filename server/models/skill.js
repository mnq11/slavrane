
// models/skill.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Skill', {
        SkillID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        MemberID: DataTypes.INTEGER,
        SkillName: DataTypes.STRING,
    });
};
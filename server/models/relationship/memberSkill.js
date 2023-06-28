// models/memberSkill.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member_skill', {
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'members', // 'members' refers to table name
                key: 'id',
            },
        },
        SkillID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'skills', // 'skills' refers to table name
                key: 'id',
            },
        },
    }, {
        timestamps: false
    });
};
// allModels/memberSkill.js
module.exports = (sequelize, DataTypes) => {
    const MemberSkill = sequelize.define('MemberSkill', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Member', // name of your model
                key: 'id',
            },
            allowNull: false
        },
        SkillID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Skill', // name of your model
                key: 'id',
            },
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return MemberSkill;
};

// models/memberRole.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member_role', {
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'members', // 'members' refers to table name
                key: 'id',
            },
        },
        RoleID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'roles', // 'roles' refers to table name
                key: 'id',
            },
        },
    }, {
        timestamps: false
    });
};
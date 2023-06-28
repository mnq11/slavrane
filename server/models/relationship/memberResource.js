// models/memberResource.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member_resource', {
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'members', // 'members' refers to table name
                key: 'id',
            },
        },
        ResourceID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'resources', // 'resources' refers to table name
                key: 'id',
            },
        },
    }, {
        timestamps: false
    });
};
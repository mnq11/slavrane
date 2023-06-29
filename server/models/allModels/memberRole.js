// allModels/memberRole.js
module.exports = (sequelize, DataTypes) => {
    const MemberRole = sequelize.define('MemberRole', {
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
        RoleID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Role', // name of your model
                key: 'id',
            },
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return MemberRole;
};

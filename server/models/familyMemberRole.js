// models/familyMemberRole.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('FamilyMemberRole', {
        MemberID: { type: DataTypes.INTEGER },
        FamilyID: { type: DataTypes.INTEGER },
        RoleID: { type: DataTypes.INTEGER },
    }, {
        timestamps: false, // for disabling createdAt and updatedAt
        freezeTableName: true, // for preventing sequelize from pluralizing the table name
    });
};
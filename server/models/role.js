
// models/role.js
module.exports = function(sequelize, DataTypes) {
    const Role = sequelize.define('Role', {
        RoleID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        RoleName: DataTypes.STRING
    });

    Role.associate = function(models) {
        Role.belongsToMany(models.Member, { through: models.FamilyMemberRole, foreignKey: 'RoleID' });
    };

    return Role;
};
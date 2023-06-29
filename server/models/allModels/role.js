// models/role.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Role', {
        RoleID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        RoleName: DataTypes.STRING
    }, {
        tableName: 'Roles'
    });
};

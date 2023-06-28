// models/resource.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Resource', {
        ResourceID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        MemberID: DataTypes.INTEGER,
        ResourceType: DataTypes.STRING, // e.g. 'Vehicle', 'Tool', 'Tank'
        ResourceName: DataTypes.STRING,
    });
};
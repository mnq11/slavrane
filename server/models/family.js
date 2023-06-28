// models/family.js
module.exports = function(sequelize, DataTypes) {
    const Family = sequelize.define('Family', {
        FamilyID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        FamilyName: DataTypes.STRING,
        Address: DataTypes.STRING,
    });

    Family.associate = function(models) {
        Family.belongsToMany(models.Member, { through: models.FamilyMemberRole, foreignKey: 'FamilyID' });
    };

    return Family;
};
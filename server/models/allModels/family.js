// models/family.js
module.exports = (sequelize, DataTypes) => {
    const Family = sequelize.define('Family', {
        FamilyID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FamilyName: DataTypes.STRING,
        Address: DataTypes.STRING,
        ContactNumber: DataTypes.STRING
    });

    return Family;
};

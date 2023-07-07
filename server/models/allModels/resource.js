// models/resource.js
module.exports = (sequelize, DataTypes) => {
    const Resource = sequelize.define('Resource', {
        ResourceID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FamilyID: DataTypes.INTEGER,
        ResourceName: DataTypes.STRING,
        ResourceValue: DataTypes.DECIMAL,
        ResourceDescription: DataTypes.TEXT,
        DateAcquired: DataTypes.DATE
    });

    return Resource;
};

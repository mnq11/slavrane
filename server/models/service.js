const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Service', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        serviceType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['booking', 'buy', 'sell', 'hire']]
            },
            comment: "Type of the service"
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Date of the service"
        },
        bills: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Bills for the service"
        },
        receipts: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Receipts for the service"
        },
        pictures: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "URLs to pictures of the service"
        }
    });
};

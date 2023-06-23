const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Bill', {
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
};

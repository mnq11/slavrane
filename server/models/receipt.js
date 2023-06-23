const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Receipt', {
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

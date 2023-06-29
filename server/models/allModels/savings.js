// models/savings.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Savings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        familyId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

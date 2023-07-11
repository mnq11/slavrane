// models/savings.js
module.exports = (sequelize, DataTypes) => {
    const Savings = sequelize.define('Savings', {
        SavingsID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        memberID: DataTypes.INTEGER,
        FamilyID: DataTypes.INTEGER,
        Amount: DataTypes.DECIMAL,
        Date: DataTypes.DATE,
        SavingsGoal: DataTypes.DECIMAL,
        TargetDate: DataTypes.DATE
    });

    return Savings;
};

// models/expense.js
module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        ExpenseID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FamilyID: DataTypes.INTEGER,
        MemberID: DataTypes.INTEGER,
        Category: DataTypes.STRING,
        Amount: DataTypes.DECIMAL,
        Date: DataTypes.DATE,
        Recurring: DataTypes.BOOLEAN,
        Frequency: DataTypes.STRING
    });

    return Expense;
};

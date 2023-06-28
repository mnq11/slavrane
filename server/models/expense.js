// models/expense.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Expense', {
        ExpenseID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        MemberID: DataTypes.INTEGER,
        Category: DataTypes.STRING,
        Amount: DataTypes.DECIMAL,
        Frequency: DataTypes.STRING,
        StartDate: DataTypes.DATE,
        EndDate: DataTypes.DATE
    });
};
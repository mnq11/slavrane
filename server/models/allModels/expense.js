// models/expense.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Expense', {
        ExpenseID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Category: { type: DataTypes.STRING, allowNull: false },
        Amount: { type: DataTypes.DECIMAL, allowNull: false },
        Frequency: { type: DataTypes.STRING, allowNull: false },
        StartDate: { type: DataTypes.DATE, allowNull: false },
        EndDate: { type: DataTypes.DATE, allowNull: false }
    });
};

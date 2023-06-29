// models/income.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Income', {
        IncomeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Source: { type: DataTypes.STRING, allowNull: false },
        Amount: { type: DataTypes.DECIMAL, allowNull: false },
        Frequency: { type: DataTypes.STRING, allowNull: false },
        StartDate: { type: DataTypes.DATE, allowNull: false },
        EndDate: { type: DataTypes.DATE, allowNull: false }
    });
};

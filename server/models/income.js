// models/income.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Income', {
        IncomeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        MemberID: DataTypes.INTEGER,
        Source: DataTypes.STRING,
        Amount: DataTypes.DECIMAL,
        Frequency: DataTypes.STRING,
        StartDate: DataTypes.DATE,
        EndDate: DataTypes.DATE
    });
};

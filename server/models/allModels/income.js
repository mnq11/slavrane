// models/income.js
module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define('Income', {
        IncomeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FamilyID: DataTypes.INTEGER,
        MemberID: DataTypes.INTEGER,
        Source: DataTypes.STRING,
        Amount: DataTypes.DECIMAL,
        Date: DataTypes.DATE,
        Recurring: DataTypes.BOOLEAN,
        Frequency: DataTypes.STRING
    });

    return Income;
};

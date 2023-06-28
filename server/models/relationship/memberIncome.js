// models/memberIncome.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member_income', {
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'members', // 'members' refers to table name
                key: 'id',
            },
        },
        IncomeID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'incomes', // 'incomes' refers to table name
                key: 'id',
            },
        },
    }, {
        timestamps: false
    });
};

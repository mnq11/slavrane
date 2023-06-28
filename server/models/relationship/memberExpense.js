// models/memberExpense.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member_expense', {
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'members', // 'members' refers to table name
                key: 'id',
            },
        },
        ExpenseID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'expenses', // 'expenses' refers to table name
                key: 'id',
            },
        },
    }, {
        timestamps: false
    });
};
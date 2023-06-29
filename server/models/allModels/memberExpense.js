// allModels/memberExpense.js
module.exports = (sequelize, DataTypes) => {
    const MemberExpense = sequelize.define('MemberExpense', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Member', // name of your model
                key: 'id',
            },
            allowNull: false
        },
        ExpenseID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Expense', // name of your model
                key: 'id',
            },
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return MemberExpense;
};

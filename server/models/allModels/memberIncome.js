// allModels/memberIncome.js
module.exports = (sequelize, DataTypes) => {
    const MemberIncome = sequelize.define('MemberIncome', {
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
        IncomeID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Income', // name of your model
                key: 'id',
            },
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return MemberIncome;
};

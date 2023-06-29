// allModels/memberTask.js
module.exports = (sequelize, DataTypes) => {
    const MemberTask = sequelize.define('MemberTask', {
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
        TaskID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Task', // name of your model
                key: 'id',
            },
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return MemberTask;
};

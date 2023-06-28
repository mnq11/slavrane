// models/memberTask.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member_task', {
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'members', // 'members' refers to table name
                key: 'id',
            },
        },
        TaskID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tasks', // 'tasks' refers to table name
                key: 'id',
            },
        },
    }, {
        timestamps: false
    });
};
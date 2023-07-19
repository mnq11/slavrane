// models/task.js
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        TaskID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MemberID: DataTypes.INTEGER,
        TaskName: DataTypes.STRING,
        TaskStatus: DataTypes.INTEGER,
        DueDate: DataTypes.DATE,
        Priority: DataTypes.STRING,
        Description: DataTypes.TEXT
    });

    return Task;
};

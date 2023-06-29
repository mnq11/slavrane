// models/task.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Task', {
        TaskID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Description: DataTypes.STRING,
        DueDate: DataTypes.DATE,
        Status: DataTypes.STRING,
    });
};

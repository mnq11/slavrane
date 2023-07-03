// models/member.js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Member', {
        MemberID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        FullName: DataTypes.STRING,
        DateOfBirth: DataTypes.DATE,
        Email: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
        Password: DataTypes.STRING,
        Role: {
            type: DataTypes.ENUM,
            values: ['normal', 'moderator', 'admin', 'analyst'],
            defaultValue: 'normal'
        }


    });
};

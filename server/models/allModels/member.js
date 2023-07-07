// models/member.js
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        MemberID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FamilyID: DataTypes.INTEGER,
        MemberName: DataTypes.STRING,
        Role: DataTypes.STRING,
        score: DataTypes.INTEGER,
        DateOfBirth: DataTypes.DATE,
        Gender: DataTypes.STRING,
        Email: DataTypes.STRING,
        Password: DataTypes.STRING,
        ContactNumber: DataTypes.STRING
    });

    return Member;
};

// models/member.js
module.exports = function(sequelize, DataTypes) {
    const Member = sequelize.define('Member', {
        MemberID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        FullName: DataTypes.STRING,
        DateOfBirth: DataTypes.DATE,
        Email: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
        Password: DataTypes.STRING,
    });

    Member.associate = function(models) {
        Member.belongsToMany(models.Family, { through: models.FamilyMemberRole, foreignKey: 'MemberID' });
        Member.hasMany(models.Resource, { foreignKey: 'MemberID' });
        Member.hasMany(models.Skill, { foreignKey: 'MemberID' });
    };

    return Member;
};

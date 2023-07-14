// relationships.js

// Helper function to define many-to-many relationships

module.exports = (models) => {
    models.Family.hasMany(models.Member, { foreignKey: 'FamilyID', onDelete: 'cascade' });
    models.Member.belongsTo(models.Family, { foreignKey: 'FamilyID' });

    models.Member.hasMany(models.Task, { foreignKey: 'MemberID', onDelete: 'cascade' });
    models.Task.belongsTo(models.Member, { foreignKey: 'MemberID' });

    models.Member.hasMany(models.Resource, { foreignKey: 'MemberID', onDelete: 'cascade' });
    models.Resource.belongsTo(models.Member, { foreignKey: 'MemberID' });

    models.Member.hasMany(models.Skill, { foreignKey: 'MemberID', onDelete: 'cascade' });
    models.Skill.belongsTo(models.Member, { foreignKey: 'MemberID' });

    models.Member.hasMany(models.Income, { foreignKey: 'MemberID', onDelete: 'cascade' });
    models.Income.belongsTo(models.Member, { foreignKey: 'MemberID' });

    models.Member.hasMany(models.Expense, { foreignKey: 'MemberID', onDelete: 'cascade' });
    models.Expense.belongsTo(models.Member, { foreignKey: 'MemberID' });

    models.Family.hasMany(models.Savings, { foreignKey: 'FamilyID', onDelete: 'cascade' });
    models.Savings.belongsTo(models.Family, { foreignKey: 'FamilyID' });

    models.Family.hasMany(models.Loan, { foreignKey: 'FamilyID', onDelete: 'cascade' });
    models.Loan.belongsTo(models.Family, { foreignKey: 'FamilyID' });
};

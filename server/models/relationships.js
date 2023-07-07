// relationships.js

// Helper function to define many-to-many relationships


module.exports = (models) => {
    module.exports = (models) => {
        models.Family.hasMany(models.Member, { foreignKey: 'FamilyID' });
        models.Member.belongsTo(models.Family, { foreignKey: 'FamilyID' });

        models.Member.hasMany(models.Task, { foreignKey: 'MemberID' });
        models.Task.belongsTo(models.Member, { foreignKey: 'MemberID' });



        models.Member.hasMany(models.Resource, { foreignKey: 'ResourceID' });
        models.Resource.belongsTo(models.Member, { foreignKey: 'ResourceID' });

        models.Member.hasMany(models.Skill, { foreignKey: 'SkillID' });
        models.Skill.belongsTo(models.Member, { foreignKey: 'SkillID' });

        models.Member.hasMany(models.Income, { foreignKey: 'IncomeID' });
        models.Income.belongsTo(models.Member, { foreignKey: 'IncomeID' });

        models.Member.hasMany(models.Expense, { foreignKey: 'ExpenseID' });
        models.Expense.belongsTo(models.Member, { foreignKey: 'ExpenseID' });

        models.Family.hasMany(models.Savings, { foreignKey: 'SavingsID' });
        models.Savings.belongsTo(models.Family, { foreignKey: 'SavingsID' });

        models.Family.hasMany(models.Loan, { foreignKey: 'LoanID' });
        models.Loan.belongsTo(models.Family, { foreignKey: 'LoanID' });
    };


 };

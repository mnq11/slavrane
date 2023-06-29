// relationships.js

// Helper function to define many-to-many relationships
const defineManyToMany = (model1, model2, throughModel, foreignKey1, foreignKey2) => {
    model1.belongsToMany(model2, { through: throughModel, foreignKey: foreignKey1 });
    model2.belongsToMany(model1, { through: throughModel, foreignKey: foreignKey2 });
};

// Helper function to define one-to-many relationships
const defineOneToMany = (model1, model2, foreignKey) => {
    model1.hasMany(model2, { foreignKey });
    model2.belongsTo(model1, { foreignKey });
};

module.exports = (models) => {
    defineOneToMany(models.Family, models.Member, 'FamilyID');

    defineManyToMany(models.Role, models.Member, models.MemberRole, 'RoleID', 'MemberID');
    defineManyToMany(models.Task, models.Member, models.MemberTask, 'TaskID', 'MemberID');
    defineManyToMany(models.Resource, models.Member, models.MemberResource, 'ResourceID', 'MemberID');
    defineManyToMany(models.Skill, models.Member, models.MemberSkill, 'SkillID', 'MemberID');
    defineManyToMany(models.Income, models.Member, models.MemberIncome, 'IncomeID', 'MemberID');
    defineManyToMany(models.Expense, models.Member, models.MemberExpense, 'ExpenseID', 'MemberID');

    defineOneToMany(models.Member, models.Savings, 'memberId');
};

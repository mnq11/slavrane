// dummyData.js
const { sequelize, models } = require('./databaseSetup');
const createDummyData = async () => {
    await sequelize.sync({ force: true });

    const dummyFamily = await models.Family.create({
        FamilyName: 'Smith',
        Address: '123 Main St'
    });

    const dummyRole = await models.Role.create({
        RoleName: 'Parent'
    });

    const dummyMember = await models.Member.create({
        FamilyID: dummyFamily.FamilyID,
        FullName: 'John Smith',
        DateOfBirth: new Date(1980, 1, 1),
        Email: 'johnsmith@example.com',
        PhoneNumber: '123-456-7890',
        Password: 'password'
    });

    const dummyTask = await models.Task.create({
        Description: 'Buy groceries',
        DueDate: new Date(2023, 6, 30),
        Status: 'Pending'
    });

    const dummyResource = await models.Resource.create({
        ResourceType: 'Vehicle',
        ResourceName: 'Car'
    });

    const dummySkill = await models.Skill.create({
        SkillName: 'Driving'
    });

    const dummyIncome = await models.Income.create({
        Source: 'Job',
        Amount: 5000,
        Frequency: 'Monthly',
        StartDate: new Date(2023, 1, 1),
        EndDate: new Date(2023, 12, 31)
    });

    const dummyExpense = await models.Expense.create({
        Category: 'Groceries',
        Amount: 200,
        Frequency: 'Weekly',
        StartDate: new Date(2023, 1, 1),
        EndDate: new Date(2023, 12, 31)
    });

    const dummySavings = await models.Savings.create({
        amount: 1000.00,
        memberId: dummyMember.MemberID,
        familyId: dummyFamily.FamilyID,
        date: new Date(),
        type: 'donation to the family fund'
    });

    // Create dummy join table data
    await models.MemberRole.create({
        MemberID: dummyMember.MemberID,
        RoleID: dummyRole.RoleID
    });

    await models.MemberTask.create({
        MemberID: dummyMember.MemberID,
        TaskID: dummyTask.TaskID
    });

    await models.MemberResource.create({
        MemberID: dummyMember.MemberID,
        ResourceID: dummyResource.ResourceID
    });

    await models.MemberSkill.create({
        MemberID: dummyMember.MemberID,
        SkillID: dummySkill.SkillID
    });

    await models.MemberIncome.create({
        MemberID: dummyMember.MemberID,
        IncomeID: dummyIncome.IncomeID
    });

    await models.MemberExpense.create({
        MemberID: dummyMember.MemberID,
        ExpenseID: dummyExpense.ExpenseID
    });

    console.log("Dummy data created successfully");
}

module.exports = createDummyData;

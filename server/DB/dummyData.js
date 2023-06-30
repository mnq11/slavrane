// dummyData.js
const { sequelize, models } = require('./databaseSetup');
const faker = require('faker');

const createDummyData = async (sequelize, models) => {
    try {
        // Sync the models with the database
        await sequelize.sync({ alter: true });

        const dummyFamily = await models.Family.create({
            FamilyName: faker.name.lastName(),
            Address: faker.address.streetAddress()
        });

        const roles = ['Parent', 'Child', 'Grandparent', 'Uncle', 'Aunt'];
        const tasks = ['Buy groceries', 'Clean the house', 'Do the laundry', 'Cook dinner', 'Mow the lawn'];
        const resources = ['Vehicle', 'Computer', 'Phone', 'Bicycle', 'Television'];
        const skills = ['Driving', 'Cooking', 'Cleaning', 'Programming', 'Teaching'];

        for (let i = 0; i < 5; i++) {
            const dummyMember = await models.Member.create({
                FamilyID: dummyFamily.FamilyID,
                FullName: faker.name.findName(),
                DateOfBirth: faker.date.past(),
                Email: faker.internet.email(),
                PhoneNumber: faker.phone.phoneNumber(),
                Password: faker.internet.password()
            });

            const dummyRole = await models.Role.create({
                RoleName: roles[i]
            });

            const dummyTask = await models.Task.create({
                Description: tasks[i],
                DueDate: faker.date.future(),
                Status: 'Pending'
            });

            const dummyResource = await models.Resource.create({
                ResourceType: resources[i],
                ResourceName: faker.commerce.productName()
            });

            const dummySkill = await models.Skill.create({
                SkillName: skills[i]
            });

            const dummyIncome = await models.Income.create({
                Source: faker.finance.transactionDescription(),
                Amount: faker.finance.amount(),
                Frequency: 'Monthly',
                StartDate: faker.date.past(),
                EndDate: faker.date.future()
            });

            const dummyExpense = await models.Expense.create({
                Category: faker.commerce.department(),
                Amount: faker.finance.amount(),
                Frequency: 'Weekly',
                StartDate: faker.date.past(),
                EndDate: faker.date.future()
            });

            await models.Savings.create({
                amount: faker.finance.amount(),
                memberId: dummyMember.MemberID,
                familyId: dummyFamily.FamilyID,
                date: faker.date.recent(),
                type: faker.finance.transactionType()
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
        }

        console.log("Dummy data created successfully");
    } catch (err) {
        console.error('Failed to create dummy data', err);
        throw new Error('Dummy data creation failed');
    }
}

module.exports = createDummyData;
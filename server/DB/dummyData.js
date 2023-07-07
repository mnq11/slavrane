const faker = require('faker');

const createDummyData = async (sequelize, models) => {
    try {
        // Sync the models with the database
        await sequelize.sync({ alter: true });

        for (let i = 0; i < 10; i++) {
            const dummyFamily = await models.Family.create({
                FamilyName: faker.name.lastName(),
                Address: faker.address.streetAddress(),
                ContactNumber: faker.phone.phoneNumber()
            });

            const dummyMember = await models.Member.create({
                FamilyID: dummyFamily.id,
                FullName: faker.name.findName(),
                DateOfBirth: faker.date.past(),
                Email: faker.internet.email(),
                PhoneNumber: faker.phone.phoneNumber(),
                Password: faker.internet.password()
            });

            const dummyTask = await models.Task.create({
                MemberID: dummyMember.id,
                Description: faker.lorem.sentence(),
                DueDate: faker.date.future(),
                Status: 'Pending'
            });

            const dummyResource = await models.Resource.create({
                MemberID: dummyMember.id,
                ResourceType: faker.commerce.productMaterial(),
                ResourceName: faker.commerce.productName()
            });

            const dummySkill = await models.Skill.create({
                MemberID: dummyMember.id,
                SkillName: faker.name.jobArea()
            });

            const dummyIncome = await models.Income.create({
                MemberID: dummyMember.id,
                Source: faker.finance.transactionDescription(),
                Amount: faker.finance.amount(),
                Frequency: 'Monthly',
                StartDate: faker.date.past(),
                EndDate: faker.date.future()
            });

            const dummyExpense = await models.Expense.create({
                MemberID: dummyMember.id,
                Category: faker.commerce.department(),
                Amount: faker.finance.amount(),
                Frequency: 'Weekly',
                StartDate: faker.date.past(),
                EndDate: faker.date.future()
            });

            const dummySavings = await models.Savings.create({
                FamilyID: dummyFamily.id,
                Amount: faker.finance.amount(),
                Date: faker.date.recent(),
                Type: faker.finance.transactionType()
            });

            const dummyLoan = await models.Loan.create({
                FamilyID: dummyFamily.id,
                Amount: faker.finance.amount(),
                StartDate: faker.date.past(),
                EndDate: faker.date.future(),
                InterestRate: parseFloat((1 + Math.random() * 4).toFixed(2))

        });
        }

        console.log("Dummy data created successfully");
    } catch (err) {
        console.error('Failed to create dummy data', err);
        throw new Error('Dummy data creation failed');
    }
}

module.exports = createDummyData;

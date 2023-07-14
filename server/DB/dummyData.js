const faker = require('faker');

const createDummyData = async (sequelize, models) => {
    // Initialize data arrays
    const families = [];
    const members = [];
    const tasks = [];
    const resources = [];
    const skills = [];
    const incomes = [];
    const expenses = [];
    const savings = [];
    const loans = [];

    try {
        // Sync the models with the database
        await sequelize.sync({ alter: true });

        for (let i = 0; i <10; i++) {
            const dummyFamily = await models.Family.create({
                FamilyName: faker.name.lastName(),
                Address: faker.address.streetAddress(),
                ContactNumber: faker.phone.phoneNumber()
            });
            families.push(dummyFamily);

            for(let j = 0; j < 10; j++) { // 10 members for each family
                const dummyMember = await models.Member.create({
                    FamilyID: dummyFamily.FamilyID,
                    MemberName: faker.name.findName(),
                    DateOfBirth: faker.date.past().toISOString(),
                    Gender: faker.random.arrayElement(["Male", "Female"]),
                    Email: faker.internet.email(),
                    Password: faker.internet.password(),
                    ContactNumber: faker.phone.phoneNumber()
                });
                members.push(dummyMember);

                for(let k = 0; k < 10; k++) { // 10 instances for each member
                    const dummyTask = await models.Task.create({
                        MemberID: dummyMember.MemberID,
                        TaskName: faker.lorem.words(3),
                        Description: faker.lorem.sentence(),
                        DueDate: faker.date.future().toISOString(),
                        TaskStatus: 'Pending',
                        Priority: faker.random.arrayElement(["Low", "Medium", "High"])
                    });
                    tasks.push(dummyTask);

                    const dummyResource = await models.Resource.create({
                        MemberID: dummyMember.MemberID,
                        FamilyID: dummyFamily.FamilyID,
                        ResourceName: faker.commerce.productName(),
                        ResourceValue: faker.commerce.price(),
                        ResourceDescription: faker.lorem.sentence(),
                        DateAcquired: faker.date.past().toISOString()
                    });
                    resources.push(dummyResource);

                    const dummySkill = await models.Skill.create({
                        MemberID: dummyMember.MemberID,
                        SkillName: faker.name.jobArea(),
                        SkillLevel: faker.random.arrayElement(["Beginner", "Intermediate", "Expert"]),
                        DateAcquired: faker.date.past().toISOString(),
                        Certification: faker.random.word()
                    });
                    skills.push(dummySkill);

                    const dummyIncome = await models.Income.create({
                        FamilyID: dummyFamily.FamilyID,
                        MemberID: dummyMember.MemberID,
                        Source: faker.finance.transactionDescription(),
                        Amount: faker.finance.amount(),
                        Date: faker.date.past().toISOString(),
                        Recurring: faker.datatype.boolean(),
                        Frequency: faker.random.arrayElement(["Weekly", "Monthly", "Yearly"])
                    });
                    incomes.push(dummyIncome);

                    const dummyExpense = await models.Expense.create({
                        MemberID: dummyMember.MemberID,
                        FamilyID: dummyFamily.FamilyID,
                        Category: faker.commerce.department(),
                        Amount: faker.finance.amount(),
                        Date: faker.date.past().toISOString(),
                        Recurring: faker.datatype.boolean(),
                        Frequency: 'Weekly'
                    });
                    expenses.push(dummyExpense);

                    const dummyLoan = await models.Loan.create({
                        MemberID: dummyMember.MemberID,
                        FamilyID: dummyFamily.FamilyID,
                        Amount: parseFloat(faker.finance.amount()),
                        InterestRate: parseFloat((1 + Math.random() * 4).toFixed(2)),
                        StartDate: faker.date.past().toISOString(),
                        DueDate: faker.date.future().toISOString(),
                        Lender: faker.company.companyName(),
                        LoanPurpose: faker.lorem.sentence(),
                        RepaymentStatus: faker.random.arrayElement(["Paid", "Pending"])
                    });
                    loans.push(dummyLoan);
                }
                const dummySavings = await models.Savings.create({
                    FamilyID: dummyFamily.FamilyID,
                    Amount: parseFloat(faker.finance.amount()),
                    Date: faker.date.recent().toISOString(),
                    SavingsGoal: parseFloat(faker.finance.amount()),
                    TargetDate: faker.date.future().toISOString()
                });
                savings.push(dummySavings);
            }
        }

        console.log("Dummy data created successfully");

        // Return created dummy data
        return {
            families,
            members,
            tasks,
            resources,
            skills,
            incomes,
            expenses,
            savings,
            loans
        };
    } catch (err) {
        console.error('Failed to create dummy data', err);
        throw new Error('Dummy data creation failed');
    }
}

module.exports = createDummyData;

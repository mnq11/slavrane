// dummyData.js
const { sequelize, Family, Role, Member, Task, MemberRole, MemberTask } = require('./databaseSetup');

const createDummyData = async () => {
    await sequelize.sync({ force: true });



    const dummyFamily = await Family.create({
        FamilyName: 'Smith',
        Address: '123 Main St'
    });

    const dummyRole = await Role.create({
        RoleName: 'Parent'
    });

    const dummyMember = await Member.create({
        FamilyID: dummyFamily.FamilyID,
        FullName: 'John Smith',
        DateOfBirth: new Date(1980, 1, 1),
        Email: 'johnsmith@example.com',
        PhoneNumber: '123-456-7890',
        Password: 'password'
    });

    const dummyTask = await Task.create({
        Description: 'Buy groceries',
        DueDate: new Date(2023, 6, 30),
        Status: 'Pending'
    });

    // Create dummy join table data
    await MemberRole.create({
        MemberID: dummyMember.MemberID,
        RoleID: dummyRole.RoleID
    });

    await MemberTask.create({
        MemberID: dummyMember.MemberID,
        TaskID: dummyTask.TaskID
    });

    console.log("Dummy data created successfully");
}

module.exports = createDummyData;

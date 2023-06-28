// models/database.js
const Sequelize = require('sequelize');
require('dotenv').config();
const mysql = require('mysql2/promise');


const createDatabaseIfNotExists = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
}
const initDatabase = async () => {
    await createDatabaseIfNotExists();

    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false  // disable logging
    });


    const defineMember = require('./member');
    const defineFamily = require('./family');
    const defineRole = require('./role');
    const defineTask = require('./task');
    const defineResource = require('./resource');
    const defineSkill = require('./skill');

    const Member = defineMember(sequelize, Sequelize.DataTypes);
    const Family = defineFamily(sequelize, Sequelize.DataTypes);
    const Role = defineRole(sequelize, Sequelize.DataTypes);
    const Task = defineTask(sequelize, Sequelize.DataTypes);
    const Resource = defineResource(sequelize, Sequelize.DataTypes);
    const Skill = defineSkill(sequelize, Sequelize.DataTypes);

    // Define relationships
    Family.hasMany(Member, { foreignKey: 'FamilyID' });
    Member.belongsTo(Family, { foreignKey: 'FamilyID' });

    Role.hasMany(Member, { foreignKey: 'RoleID' });
    Member.belongsTo(Role, { foreignKey: 'RoleID' });

    Role.hasMany(Task, { foreignKey: 'RoleID' });
    Task.belongsTo(Role, { foreignKey: 'RoleID' });

    Member.hasMany(Resource, { foreignKey: 'MemberID' });
    Resource.belongsTo(Member, { foreignKey: 'MemberID' });

    Member.hasMany(Skill, { foreignKey: 'MemberID' });
    Skill.belongsTo(Member, { foreignKey: 'MemberID' });

    await sequelize.sync({ force: true });  // Use force: true to drop existing tables and create new ones

    // Create dummy data
    const dummyFamily = await Family.bulkCreate([
        { FamilyName: 'Smith', Address: '123 Main St' },
        { FamilyName: 'Johnson', Address: '456 Oak Ave' },
        // Add more families as needed
    ]);
    const dummyRole = await Role.bulkCreate([
        { RoleName: 'Parent' },
        { RoleName: 'Child' },
        // Add more roles as needed
    ]);
    const dummyMember = await Member.bulkCreate([
        { FamilyID: 1, RoleID: 1, FullName: 'John Smith', DateOfBirth: new Date(1980, 1, 1), Email: 'johnsmith@example.com', PhoneNumber: '123-456-7890', Password: 'password' },
        { FamilyID: 1, RoleID: 2, FullName: 'Jane Smith', DateOfBirth: new Date(1982, 2, 2), Email: 'janesmith@example.com', PhoneNumber: '234-567-8901', Password: 'password' },
        // Add more members as needed
    ]);
    const dummyTask = await Task.bulkCreate([
        { RoleID: 1, Description: 'Buy groceries', DueDate: new Date(2023, 6, 30), Status: 'Pending' },
        { RoleID: 2, Description: 'Do homework', DueDate: new Date(2023, 6, 30), Status: 'Pending' },
        // Add more tasks as needed
    ]);

    return { sequelize, Member, Family, Role, Task, Resource, Skill };
}

module.exports = initDatabase;

// databaseSetup.js
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig');  // Import database configuration

const createDatabaseIfNotExists = async () => {
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
}

const initDatabase = async () => {
    await createDatabaseIfNotExists();

    const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        dialect: 'mysql',
        logging: false  // disable logging
    });

    // Define models
    const models = {
        Member: require('../models/member')(sequelize, Sequelize.DataTypes),
        Family: require('../models/family')(sequelize, Sequelize.DataTypes),
        Role: require('../models/role')(sequelize, Sequelize.DataTypes),
        Task: require('../models/task')(sequelize, Sequelize.DataTypes),
        Resource: require('../models/resource')(sequelize, Sequelize.DataTypes),
        Skill: require('../models/skill')(sequelize, Sequelize.DataTypes),
        Income: require('../models/income')(sequelize, Sequelize.DataTypes),
        Expense: require('../models/expense')(sequelize, Sequelize.DataTypes),
        MemberRole: require('../models/relationship/memberRole')(sequelize, Sequelize.DataTypes),
        MemberTask: require('../models/relationship/memberTask')(sequelize, Sequelize.DataTypes),
        MemberResource: require('../models/relationship/memberResource')(sequelize, Sequelize.DataTypes),
        MemberSkill: require('../models/relationship/memberSkill')(sequelize, Sequelize.DataTypes),
        MemberIncome: require('../models/relationship/memberIncome')(sequelize, Sequelize.DataTypes),
        MemberExpense: require('../models/relationship/memberExpense')(sequelize, Sequelize.DataTypes)
    };

    // Define relationships
    models.Family.hasMany(models.Member, {foreignKey: 'FamilyID'});
    models.Member.belongsTo(models.Family, {foreignKey: 'FamilyID'});

    models.Role.belongsToMany(models.Member, {through: models.MemberRole, foreignKey: 'RoleID'});
    models.Member.belongsToMany(models.Role, {through: models.MemberRole, foreignKey: 'MemberID'});

    models.Task.belongsToMany(models.Member, {through: models.MemberTask, foreignKey: 'TaskID'});
    models.Member.belongsToMany(models.Task, {through: models.MemberTask, foreignKey: 'MemberID'});

    models.Resource.belongsToMany(models.Member, {through: models.MemberResource, foreignKey: 'ResourceID'});
    models.Member.belongsToMany(models.Resource, {through: models.MemberResource, foreignKey: 'MemberID'});

    models.Skill.belongsToMany(models.Member, {through: models.MemberSkill, foreignKey: 'SkillID'});
    models.Member.belongsToMany(models.Skill,{through: models.MemberSkill, foreignKey: 'MemberID'});

    models.Income.belongsToMany(models.Member, {through: models.MemberIncome, foreignKey: 'IncomeID'});
    models.Member.belongsToMany(models.Income, {through: models.MemberIncome, foreignKey: 'MemberID'});

    models.Expense.belongsToMany(models.Member, {through: models.MemberExpense, foreignKey: 'ExpenseID'});
    models.Member.belongsToMany(models.Expense, {through: models.MemberExpense, foreignKey: 'MemberID'});

    await sequelize.sync({ force: true });  // Use force: true to drop existing tables and create new ones

    return { sequelize, models };  // Make sure to include sequelize here
}

module.exports = initDatabase;
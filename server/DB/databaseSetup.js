const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');
const defineModels = require('../models/Models');  // Import your models
const defineRelationships = require('../models/relationships');  // Import your relationships

const sequelize = new Sequelize({
    database: dbConfig.database,
    username: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    dialect: 'mysql',
    logging: false
});

const models = defineModels(sequelize, Sequelize.DataTypes);
defineRelationships(models);

module.exports = { sequelize, models };

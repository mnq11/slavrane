// databaseSetup.js
const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');
const defineModels = require('../models/Models');
const defineRelationships = require('../models/relationships');

const sequelizeWithoutDB = new Sequelize({
    username: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    dialect: 'mysql',
    logging: false
});

async function initializeDatabase() {
    try {
        // Create database if it doesn't exist
        await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`);
        console.log('Database created');

        // Close the connection to prevent potential connection leaks
        await sequelizeWithoutDB.close();

        // Connect to the newly created database
        const sequelize = new Sequelize({
            database: dbConfig.database,
            username: dbConfig.user,
            password: dbConfig.password,
            host: dbConfig.host,
            dialect: 'mysql',
            logging: false
        });

        // Define models and relationships
        const models = defineModels(sequelize, Sequelize.DataTypes);
        defineRelationships(models);

        // Return sequelize instance and models
        return { sequelize, models };
    } catch (err) {
        console.error('Failed to create database', err);
        throw new Error('Database initialization failed');
    }
}

module.exports = initializeDatabase;

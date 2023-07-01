// databaseSetup.js
const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');
const defineModels = require('../models/Models');
const defineRelationships = require('../models/relationships');

async function initializeDatabase() {
    try {
        // Connect to MySQL without specifying a database
        const sequelizeWithoutDB = new Sequelize({
            username: dbConfig.user,
            password: dbConfig.password,
            host: dbConfig.host,
            dialect: 'mysql',
            logging: false
        });

        // Create database if it doesn't exist
        await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`);
        console.log('Database available');

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

        // Test the connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Define models and relationships
        const models = defineModels(sequelize, Sequelize.DataTypes);
        defineRelationships(models);

        // Sync the models with the database
        await sequelize.sync();
        console.log('Models have been synced with the database.');

        // Return sequelize instance, models, and getModels function
        return {
            sequelize,
            models,
            getModels: () => models
        };
    } catch (err) {
        console.error('Failed to create database', err);
        throw new Error('Database initialization failed');
    }
}

module.exports = initializeDatabase;

const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabaseIfNotExists = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    connection.close();
}

const initDatabase = async () => {
    await createDatabaseIfNotExists();

    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false  // disable logging
    });

    const defineUser = require('./user');
    const defineService = require('./service');
    const defineBill = require('./bill');
    const defineReceipt = require('./receipt');

    const User = defineUser(sequelize, Sequelize.DataTypes);
    const Service = defineService(sequelize, Sequelize.DataTypes);
    const Bill = defineBill(sequelize, Sequelize.DataTypes);
    const Receipt = defineReceipt(sequelize, Sequelize.DataTypes);

    // Define relationships
    User.hasMany(Service, { foreignKey: 'userId' });
    Service.belongsTo(User, { foreignKey: 'userId' });

    Service.hasMany(Receipt, { foreignKey: 'serviceId' });
    Receipt.belongsTo(Service, { foreignKey: 'serviceId' });

    Bill.belongsTo(User, { foreignKey: 'userId' });
    Bill.belongsTo(Service, { foreignKey: 'serviceId' });
    User.hasMany(Bill, { foreignKey: 'userId' });
    Service.hasMany(Bill, { foreignKey: 'serviceId' });

    await sequelize.sync();

    return { sequelize, User, Service, Bill, Receipt };  // return User model here
}

module.exports = initDatabase();

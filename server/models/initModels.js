// initModels.js
const sequelizePromise = require('./database');
const DataTypes = require('sequelize').DataTypes;

const defineUser = require('./user');
const defineService = require('./service');
const defineBill = require('./bill');
const defineReceipt = require('./receipt');

const initModels = async () => {
    const sequelize = await sequelizePromise;

    // Initialize models
    const User = defineUser(sequelize, DataTypes);
    const Service = defineService(sequelize, DataTypes);
    const Bill = defineBill(sequelize, DataTypes);
    const Receipt = defineReceipt(sequelize, DataTypes);

    // Define relationships
    User.hasMany(Service, { foreignKey: 'userId' });
    Service.belongsTo(User, { foreignKey: 'userId' });

    Service.hasMany(Receipt, { foreignKey: 'serviceId' });
    Receipt.belongsTo(Service, { foreignKey: 'serviceId' });

    Bill.belongsTo(User, { foreignKey: 'userId' });
    Bill.belongsTo(Service, { foreignKey: 'serviceId' });
    User.hasMany(Bill, { foreignKey: 'userId' });
    Service.hasMany(Bill, { foreignKey: 'serviceId' });

    // Sync all models
    await Promise.all([
        User.sync(),
        Service.sync(),
        Bill.sync(),
        Receipt.sync()
    ]);

    return { User, Service, Bill, Receipt };
};

// Finally export the models
module.exports = initModels;

// models/Models.js
const importModel = (modelName, sequelize, DataTypes) => {
    try {
        return require(`./allModels/${modelName}`)(sequelize, DataTypes);
    } catch (err) {
        console.error(`Error loading model: ${modelName}`, err);
    }
};

module.exports = (sequelize, DataTypes) => {
    const modelNames = [
        'member',
        'family',
        'task',
        'resource',
        'skill',
        'income',
        'expense',
        'savings',
        'loan'
    ];
    return modelNames.reduce((models, modelName) => {
        models[modelName.charAt(0).toUpperCase() + modelName.slice(1)] = importModel(modelName, sequelize, DataTypes);
        return models;
    }, {});
};

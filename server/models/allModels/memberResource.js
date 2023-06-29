// allModels/memberResource.js
module.exports = (sequelize, DataTypes) => {
    const MemberResource = sequelize.define('MemberResource', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MemberID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Member', // name of your model
                key: 'id',
            },
            allowNull: false
        },
        ResourceID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Resource', // name of your model
                key: 'id',
            },
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return MemberResource;
};

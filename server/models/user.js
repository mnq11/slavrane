// server/models/user.js
const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('User', {
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "URL to the user's avatar image"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
            comment: "User's email address"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "User's password"
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'regular',
            validate: {
                isIn: [['admin', 'regular', 'guest', 'serviceProvider', 'customer']]
            },
            comment: "Type of the user"
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isNumeric: true
            },
            comment: "User's phone number"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "User's street address"
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "User's city"
        },
        town: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "User's town"
        }
    }, {
        // Other model options go here
    });
};

const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const SiteUser = sequelize.define('SiteUser', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'site_user',
    timestamps: false
});

module.exports = SiteUser;
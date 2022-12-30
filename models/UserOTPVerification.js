require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
});

const UserOTPVerification = sequelize.define('user_otp_verification', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    googleID: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    otp: {
        type: Sequelize.VARCHAR(4),
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE.NOW(),
        allowNull: false,
    },
    expiresAt: {
        type: Sequelize.DATE.NOW() + Sequelize.INTERVAL('5 minutes'),
        allowNull: false,
    }
});

module.exports = UserOTPVerification;

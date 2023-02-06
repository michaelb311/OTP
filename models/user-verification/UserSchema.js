require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
});

const User = sequelize.define('user', {
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
    displayName: {
        type: Sequelize.varChar(60),
        allowNull: false,
    },
    firstName: {
        type: Sequelize.varChar(60),
        allowNull: false,
    },
    lastName: {
        type: Sequelize.varChar(60),
        allowNull: false,
    },
    email: {
        type: Sequelize.varChar(255),
        allowNull: false,
    },
    image: {
        type: Sequelize.varChar(255),
        allowNull: true,
    },
    createdAt: {
        type: Sequelize.DATE.NOW(),
        allowNull: false,
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

module.exports = User;


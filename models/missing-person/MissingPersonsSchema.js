require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const MissingPerson = sequelize.define('missing_person', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.VARCHAR(100),
        allowNull: false
    },
    lastName: {
        type: Sequelize.VARCHAR(140),
        allowNull: false
    },
    primaryEthnicity: {
        type: Sequelize.ENUM({
            values: [
                'white/caucasian',
                'black/african american',
                'asian or pacific islander',
                'native american or indigenous',
                'latino/a',
                'other'
            ]
        })
    },
    secondaryEthnicity: {
        type: Sequelize.ENUM({
            values: [
                'white/caucasian',
                'black/african american',
                'asian or pacific islander',
                'native american or indigenous',
                'latino/a',
                'other'
            ]
        })
    },
    tertiaryEthnicity: {
        type: Sequelize.ENUM({
            values: [
                'white/caucasian',
                'black/african american',
                'asian or pacific islander',
                'native american or indigenous',
                'latino/a',
                'other'
            ]
        })
    },
    photo: {
        type: Sequelize.VARCHAR(255),
        allowNull: true
    },
    gender: {
        type: Sequelize.ENUM({
            values: [
                'male',
                'female',
                Sequelize.VARCHAR(30)
            ]
        }),
        allowNull: false
    },
    lastSeenTime: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    lastSeenPlace: {
        type: DataTypes.GEOGRAPHY,
        allowNul: false
    }
});

module.exports = MissingPerson;
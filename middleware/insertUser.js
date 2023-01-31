const insertNewUserQuery = require('../models/user-verification/insertNewUserQuery');
const pool = require('../config/db');

const insertUser = async (newUserValuesArr) => {
    try {
        const res = await pool.query(insertNewUserQuery, newUserValuesArr);
        res.rowCount > 0 ? console.log('New user added to database') : console.log('User already exists in database');
    } catch (err) {
    console.log('Error adding new user to database: ', err);
    }
}

module.exports = insertUser;
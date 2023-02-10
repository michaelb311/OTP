const pool = require('../config/db');
const { unverifyUserQuery, verifyUserQuery } = require('../models/user-verification/updateVerifiedUserQuery');

const verifyUser = async (userGID) => {
    try {
        await pool.query(verifyUserQuery, [userGID]);
        return true;
    } catch (err) {
    console.log('Error verifying user in database: ', err);
    }

}

const unverifyUser = async (userGID) => {
    try {
        await pool.query(unverifyUserQuery, [userGID]);
        return false;
    } catch (err) {
    console.log('Error unverifying user in database: ', err);
    }

}

module.exports = {verifyUser, unverifyUser}
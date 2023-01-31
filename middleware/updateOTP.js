//Config
const pool = require('../config/db');
//Models
const newOTPValues = require('../models/otp-verification/newOTPValues');
const checkOTPQuery = require('../models/otp-verification/checkOTPQuery');
const insertNewOTPQuery = require('../models/otp-verification/insertNewOTPQuery');

const updateOTP = async (newOTP, googleid, displayName) => {
    const {hashedOTP} = newOTP;
    const newOTPValuesObject = newOTPValues(googleid, hashedOTP);
    try {
        pool.query(checkOTPQuery, [newOTPValuesObject.googleid], (err, res) => {
            if (err) {
                console.log('Error checking for existing OTP: ', err);
            } else {
                const insertNewOTPValues = Object.values(newOTPValuesObject);
                console.log('insertNewOTPValues: ', insertNewOTPValues)
                pool.query(insertNewOTPQuery, insertNewOTPValues, (err, result) => {
                    err ? console.log('Error adding OTP to database: ', err) : console.log(`OTP for ${displayName} added to database`);
                });
            }
        });
        
    } catch (err) {
        console.log('Error updating OTP:', err);
    }

}

module.exports = updateOTP;
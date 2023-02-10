const checkOTPQuery = require('../models/otp-verification/checkOTPQuery');
const pool = require('../config/db');
    
const checkOTP = (userGID) => {
    return new Promise((resolve, reject) => {
        pool.query(checkOTPQuery, [userGID], (err, result) => {
            if(err) {
                console.log('Error checking OTP in database').reject(err);
            } else {
                const otpExpiresAt = result.rows[0].otp_expires_at;
                resolve(otpExpiresAt);
            }
        });
    }); 
}

module.exports = checkOTP
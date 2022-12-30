require('dotenv').config({path: '../config/config.env'});
require('../config/passport');

const mailgun = require('mailgun-js');
const bcrypt = require('bcrypt');
const {pool} = require('../config/db');

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const sendOTPEmail = async (email, googleid, displayName, res) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);

        //mail options
        const mailOptions = {
            from: 'mbogart816@gmail.com',
            to: email,
            subject: `Verify your email address`,
            html: `<p> <b>${displayName}'s</b> one time password is <b>${otp}</b>. It will expire in 15 minutes.</p>`
        };
        
        console.log(`Sending OTP to ${email}...`);
        //hash the otp
        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(otp.toString(), salt);

        const newOTPVerification = {
            googleid: googleid,
            otp: hashedOTP,
            OTP_created_at: new Date(),
            OTP_expires_at: new Date(Date.now() + (15 * 60 * 10000))
        };

        const checkOTPQuery = 'SELECT * FROM otp WHERE googleid = $1';

        pool.query(checkOTPQuery, [newOTPVerification.googleid], (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.rows.length > 0) {
                    const updateOTPQuery = 'UPDATE otp SET otp = $1, OTP_created_at = $2, OTP_expires_at = $3 WHERE googleid = $4';
                    const updateOTPValues = [newOTPVerification.otp, newOTPVerification.OTP_created_at, newOTPVerification.OTP_expires_at, newOTPVerification.googleid];

                    pool.query(updateOTPQuery, updateOTPValues, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`OTP for ${displayName} updated in database`);
                        }
                    });
                } else {
                    const insertNewOTPQuery = 'INSERT INTO otp (googleid, otp, OTP_created_at, OTP_expires_at) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT 1 FROM otp WHERE googleid = $1)';

                    const newOTPValues = [newOTPVerification.googleid, newOTPVerification.otp, newOTPVerification.OTP_created_at, newOTPVerification.OTP_expires_at];
                
                    pool.query(insertNewOTPQuery, newOTPValues, (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(`OTP for ${displayName} added to database`);
                      }
                    });
                }
            }
        });

        await mg.messages().send(mailOptions, (error, body) => {
            if (error) {
                console.log(error);
            } else {
                console.log(body);
            }
        });

    } catch (error) {
        console.log(error);
    }
};

module.exports = sendOTPEmail;
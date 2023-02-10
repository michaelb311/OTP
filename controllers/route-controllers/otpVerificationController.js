require('../../middleware/passport');
const bcrypt = require('bcrypt');
const pool = require('../../config/db');
const checkOTPQuery = require('../../models/otp-verification/checkOTPQuery');
const {verifyUserQuery} = require('../../models/user-verification/updateVerifiedUserQuery');

const sendOTPForm = (req, res) => {
    res.send(`<p>'One Time Password sent to your email!'</p>
    <br/> <form action="/otpVerification" method="POST"> ${req.user.displayName}
    <br/> <input type="hidden" name="googleid" value=${req.user.id}> 
    <br/> <input type="text" name="otp" placeholder="Enter your One Time Password"> 
    <br/> <button type="submit">Verify OTP</button> </form>`);
}

const verifyOTP = (req, res) => {
    try {
        let { googleid, otp } = req.body;
        if (!googleid || !otp) {
        throw Error('Missing required fields');
        } else {
        pool.query(checkOTPQuery, [googleid], (err, result) => {
            if (err) {
            throw Error(err);
            } else {
            if (result.rows.length === 0) {
                res.status(400).send('Invalid OTP');
            } else {
                const storedOTP = result.rows[0].otp;
                bcrypt.compare(otp, storedOTP, (error, isMatch) => {
                if (error) {
                    throw Error(error);
                }
                if (isMatch) {

                    pool.query(verifyUserQuery, [googleid], (err, result) => {
                    if (err) {
                        throw Error(err);
                    } else {
                        res.status(200).redirect('/');
                    }
                    });
                } else {
                    res.status(400).send('Invalid OTP');
                }
                });
            }
            }
        });
        }
    } catch (error) {
        if (error.message.includes('Missing required fields')) {
        res.status(400).send('Missing required fields');
        } else {
        res.status(500).send('Internal server error');
        console.log(error);
        }
    }
}

module.exports = {sendOTPForm, verifyOTP};
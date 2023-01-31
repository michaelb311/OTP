//Config
const {mg, mailOptions} = require('./mailgun');

const sendOTPEmail = async (email, displayName, rawOTP, res) => {
    try {
        await mg.messages().send(mailOptions(email, displayName, rawOTP), (err, body) => {
            err ? console.log('Error sending email: ', err) : console.log('Email sent');
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendOTPEmail;
const mailgun = require('mailgun-js');
require('dotenv').config({path: '../config/config.env'});

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const mailOptions = (email, displayName, rawOTP) => {
    from = 'mbogart816@gmail.com',
    to = email,
    subject = `Verify your email address`,
    html = `<p> <b>${displayName}'s</b> one time password is <b>${rawOTP}</b>. It will expire in 15 minutes.</p>`

    return {from, to, subject, html};
};

module.exports = {mg, mailOptions};
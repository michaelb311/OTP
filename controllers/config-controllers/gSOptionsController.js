require('dotenv').config({path: './config/config.env'});

const gsoptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'login/google/callback'
};

module.exports = gsoptions;
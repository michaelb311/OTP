const passport = require('passport');

const passportInit = passport.authenticate('google', { scope: ['profile', 'email'] });

const passportCallback = passport.authenticate('google', { failureRedirect: '/login' });

module.exports = {passportInit, passportCallback};
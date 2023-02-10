const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureUser = require('../middleware/ensureUser');

router.get('/', ensureUser, (req, res) => {
    res.send(`'<a href="/login/google">Sign in with Google!</a>'`)
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => res.redirect('/otpVerification'));

module.exports = router;
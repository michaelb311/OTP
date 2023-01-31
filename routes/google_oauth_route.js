const express = require('express');
const router = express.Router();
const { passportInit, passportCallback } = require('../controllers/config-controllers/passportController');

router.get('/', passportInit);

router.get('/callback', passportCallback, (req, res) => res.redirect('/otpVerification'));

module.exports = router;
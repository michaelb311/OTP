const express = require('express');
const router = express.Router();

const { sendOTPForm, verifyOTP } = require('../controllers/otpVerificationController');

router.route('/')
    .get(sendOTPForm)
    .post(verifyOTP)   

module.exports = router;
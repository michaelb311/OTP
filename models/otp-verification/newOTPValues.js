module.exports = function(googleid, hashedOTP) {
    googleid,
    hashedOTP,
    OTP_created_at = new Date(),
    OTP_expires_at = new Date(Date.now() + (1000 * 60 * 15))

    return {googleid, hashedOTP, OTP_created_at, OTP_expires_at}
}
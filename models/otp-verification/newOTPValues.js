module.exports = function(googleid, hashedOTP) {
    googleid,
    hashedOTP,
    OTP_created_at = new Date(),
    OTP_expires_at = new Date(Date.now() + (15 * 60 * 10000))

    return {googleid, hashedOTP, OTP_created_at, OTP_expires_at}
}
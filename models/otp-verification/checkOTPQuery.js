const checkOTPQuery = 'SELECT * FROM otp WHERE googleid = $1';

module.exports = checkOTPQuery;
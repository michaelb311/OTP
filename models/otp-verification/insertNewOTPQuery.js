const insertNewOTPQuery = `
INSERT INTO otp (googleid, otp, OTP_created_at, OTP_expires_at) 
VALUES ($1, $2, $3, $4) 
ON CONFLICT  (googleid) DO UPDATE SET 
    otp = EXCLUDED.otp, 
    OTP_created_at = EXCLUDED.OTP_created_at, 
    OTP_expires_at = EXCLUDED.OTP_expires_at
`;

module.exports = insertNewOTPQuery;
const checkOTP = require('./checkOTP');
const { unverifyUser, verifyUser } = require('./userVerification');

const updateUserVerification = async (req, res, err) => {
    if (!req.user || req.user.id === undefined){
        return false;
    }else {
        const userGID = req.user.id

        const otpExpiresAt = await checkOTP(userGID);
        const thisMoment = new Date();
        const expiresAt = otpExpiresAt;

        let result;
        if (err) {
            console.log('Error updating user verification.', err);
            res.redirect('/login');
        } else if (thisMoment >= expiresAt) {
            await unverifyUser(userGID);
            console.log('User unverified.');
            result = false;
        } else {
            await verifyUser(userGID);
            console.log('User verified.');
            result = true;
        }
        return result;
    }
}

module.exports = updateUserVerification

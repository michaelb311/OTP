const updateUserVerification = require('./updateUserVerification');

const ensureAuth = async (req, res, next) => {
    const userVerificationStatus = await updateUserVerification(req, res);
    const isAuthenticated = await req.isAuthenticated()
    if(isAuthenticated && userVerificationStatus === true) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = ensureAuth;
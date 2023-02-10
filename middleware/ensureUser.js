const ensureUser = async (req, res, next) => {
    const isAuthenticated = await req.isAuthenticated()
    if(isAuthenticated) {
        res.redirect('/');
    } else {
        return next();
    }
}

module.exports = ensureUser;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
//Controllers
const gsOptions = require('../controllers/config-controllers/gSOptionsController');
//Models
const newUserValues = require('../models/user-verification/newUserValues');
//Middleware
const sendOTPEmail = require('./sendOTPEmail');
const createHashedOTP = require('./createOTP');
const updateOTP = require('./updateOTP');
const insertUser = require('./insertUser');

module.exports = async function(passport){
  passport.use(new GoogleStrategy( gsOptions, async (accessToken, refreshToken, profile, cb) => {
    if(!profile) return cb(null, false);
    
    const newUserValuesArr = newUserValues(profile);

    await insertUser(newUserValuesArr)
    
    const newOTP = await createHashedOTP();

    await updateOTP(newOTP, profile.id, profile.displayName);

    await sendOTPEmail(profile.email, profile.displayName, newOTP.rawOTP);

    return cb(null, profile);
 }));

  // Serialize the user's profile information to be saved in the session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  // Deserialize the user's profile information from the session
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
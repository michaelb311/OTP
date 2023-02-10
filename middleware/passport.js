const GoogleStrategy = require('passport-google-oauth2').Strategy;
//Models
const newUserValues = require('../models/user-verification/newUserValues');
//Middleware
const sendOTPEmail = require('./sendOTPEmail');
const createHashedOTP = require('./createOTP');
const insertOTP = require('./insertOTP');
const insertUser = require('./insertUser');
require('dotenv').config({path: './config/config.env'});


module.exports = async function(passport){
  passport.use(new GoogleStrategy( 
    { 
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/login/google/callback'
    }, 
    async (accessToken, refreshToken, profile, cb) => {
      if(!profile) return cb(null, false);
      
      const newUserValuesArr = newUserValues(profile);

      await insertUser(newUserValuesArr)
      
      const newOTP = await createHashedOTP();

      await insertOTP(newOTP, profile.id, profile.displayName);

      await sendOTPEmail(profile.email, profile.displayName, newOTP.rawOTP);

      return cb(null, profile);
    }
  ));

  // Serialize the user's profile information to be saved in the session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  // Deserialize the user's profile information from the session
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
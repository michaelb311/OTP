const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config({path: './config/config.env'});
const { pool } = require('./db');
const sendOTPEmail = require('../middleware/sendOTPEmail');

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL: '/google/callback'
  }, (accessToken, refreshToken, profile, cb) => {

    if(!profile) return cb(null, false);

    const newUser = {
      googleid: profile.id,
      display_name: profile.displayName,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      image: profile.photos[0].value,
      created_at: new Date(),
      email: profile.email
    };

    console.log(newUser.googleid);
  
    const insertNewUserQuery = 'INSERT INTO users (googleid, display_name, first_name, last_name, image, created_at, email) SELECT $1, $2, $3, $4, $5, $6, $7 FROM (SELECT 1) s WHERE NOT EXISTS (SELECT googleid FROM users WHERE googleid = $1)';
    
    const newUserValues = [newUser.googleid, newUser.display_name, newUser.first_name, newUser.last_name, newUser.image, newUser.created_at, newUser.email];

    pool.query(insertNewUserQuery, newUserValues, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('New user added to database');
      }
    });

    sendOTPEmail(profile.email, profile.id, profile.displayName);

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
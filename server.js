require('dotenv').config({path: './config/config.env'});
const pool = require('./config/db');
// Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
// Routes
const indexRoute = require('./routes/index_route');
const googleOAuthRoute = require('./routes/google_oauth_route');
const otpRoute = require('./routes/otp_verification_route');
const protectedRoute = require('./routes/protected_route');
// Middlewre
require('./middleware/passport')(passport);
const pgSession = require('connect-pg-simple')(session);


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionStorage = new pgSession({
  pool, 
  tableName: "user_sessions"
})

app.use(session({
  sid: (req) => {
    return uuidv4();
  },
  name: 'User_Session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStorage,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 //one day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoute);

app.use('/protected', protectedRoute);

app.use('/login', googleOAuthRoute);

app.use('/otpVerification', otpRoute);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
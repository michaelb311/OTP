require('dotenv').config({path: './config/config.env'});
// Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
// Routes
const indexRoute = require('./routes/index_route');
const googleOAuthRoute = require('./routes/google_oauth_route');
const otpRoute = require('./routes/otp_verification_route');

require('./middleware/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoute);

app.use('/google', googleOAuthRoute);

app.use('/otpVerification', otpRoute);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
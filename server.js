require('dotenv').config({path: './config/config.env'});

const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const isLoggedIn = require('./middleware/auth');
const { pool } = require('./config/db');
const bodyParser = require('body-parser');
require('./config/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

pool.connect((err, pool, release) => {
  // const createUsersTableQuery = 'CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, googleid VARCHAR(60) NOT NULL, display_name VARCHAR(60) NOT NULL, first_name VARCHAR(60) NOT NULL, last_name VARCHAR(60) NOT NULL, email VARCHAR(255) NOT NULL, image VARCHAR(255), created_at TIMESTAMP NOT NULL DEFAULT NOW())';

  // if (err) {
  //   return console.error('Error acquiring client', err.stack);
  // } else {
  //   pool.query(createUsersTableQuery, (err, res) => {
  //     if (err) {
  //       if (err.message.includes('table already exists') || err.code === '42P07') {
  //         console.log('user table already exists');
  //       } else {
  //         console.log(err.stack);
  //       }
  //     }
  //   });
  // }

  // const createOTPTableQuery = 'CREATE TABLE IF NOT EXISTS otp ( id SERIAL PRIMARY KEY, googleid VARCHAR(60) NOT NULL UNIQUE, otp VARCHAR(4) NOT NULL, OTP_created_at TIMESTAMP NOT NULL DEFAULT NOW(), OTP_expires_at TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL \'5 minutes\')';

  // if (err) {
  //   return console.error('Error acquiring client', err.stack);
  // } else {
  //   pool.query(createOTPTableQuery, (err, res) => {
  //     if (err) {
  //       if (err.message.includes('table already exists') || err.code === '42P07') {
  //         console.log('otp table already exists');
  //       } else {
  //         console.log(err.stack);
  //       }
  //     }
  //   });
  // };

  console.log('Connected to database');
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/google">Sign in with Google to go to protected route.</a> <br/> <br/> <br/> <a href="/protected">PROTECTED ROUTE!!!</a>');
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/otpVerification');
});

app.get('/login', (req, res) => {
  res.send('I said you have to log in! <a href="/google">Sign in with Google</a>');
});

app.get('/otpVerification', (req, res) => {
  console.log(req.user);
  res.send(`<p>'One Time Password sent to your email!'</p>
  <br/> <form action="/verifyOTP" method="POST"> ${req.user.displayName}
  <br/> <input type="text" name="googleid" value=${req.user.id}> 
  <br/> <input type="text" name="otp" placeholder="Enter your One Time Password"> 
  <br/> <button type="submit">Verify OTP</button> </form>`);
});

app.post('/verifyOTP', (req, res) => {
  try {
    let { googleid, otp } = req.body;
    console.log(req.body);
    if (!googleid || !otp) {
      throw Error('Missing required fields');
    } else {
      const verifyOTPQuery = 'SELECT * FROM otp WHERE googleid = $1';
      pool.query(verifyOTPQuery, [googleid], (err, result) => {
        console.log(result.rows);
        if (err) {
          throw Error(err);
        } else {
          if (result.rows.length === 0) {
            res.status(400).send('Invalid OTP');
          } else {
            const storedOTP = result.rows[0].otp;
            bcrypt.compare(otp, storedOTP, (error, isMatch) => {
              if (error) {
                throw Error(error);
              }
              if (isMatch) {

                const updateVerifiedQuery = 'UPDATE users SET verified = true WHERE googleid = $1';
                pool.query(updateVerifiedQuery, [googleid], (err, result) => {
                  if (err) {
                    throw Error(err);
                  } else {
                    res.status(200).send('OTP verified!');
                  }
                });
              } else {
                res.status(400).send('Invalid OTP');
              }
            });
          }
        }
      });
    }
  } catch (error) {
    if (error.message.includes('Missing required fields')) {
      res.status(400).send('Missing required fields');
    } else {
      res.status(500).send('Internal server error');
      console.log(error);
    }
  }
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
const pg = require('pg');
require('dotenv').config({path: './config/config.env'});

// creat a new pool instance
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

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

module.exports = pool;
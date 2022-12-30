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

module.exports = {pool};
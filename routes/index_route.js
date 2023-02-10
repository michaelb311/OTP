const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => res.send('<h1>Dashboard</h1> <br/> <br/> <a href="/login">Sign in!</a> <br/> <br/> <a href="/protected"> Protected Route.</a>'))

module.exports = router;
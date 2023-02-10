const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');

router.route('/')
    .get(ensureAuth, (req, res) => {
        res.send(`Welcome, ${req.user.displayName}`)
    })

module.exports = router
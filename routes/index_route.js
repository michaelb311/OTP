const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => res.send('<a href="/google">Sign in with Google to go to protected route.</a>'))

module.exports = router;
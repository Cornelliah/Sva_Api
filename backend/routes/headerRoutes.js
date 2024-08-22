const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.get('/auth', (req, res) => {
    res.json({ authorization_header: process.env.ORANGE_AUTH_HEADER });
});

module.exports = router;

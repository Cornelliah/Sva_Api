const express = require('express');
const router = express.Router();
const db = require('../db');
const orangeSms = require('../orangeSms'); 

// POST /send-sms
router.post('/send', (req, res) => {
    const dataObject = req.body;
    console.log(dataObject);

    orangeSms(dataObject)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(500).json({ message: 'Erreur lors de l\'envoi du SMS', error });
        });
});

module.exports = router;

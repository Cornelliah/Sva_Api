const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour ajouter une nouvelle campagne
router.post('/campagnes', async (req, res) => {
    const { nom, contacts } = req.body;
    const contactsArray = contacts.join(','); 

    try {
        const [result] = await db.execute(
            'INSERT INTO campagne (nom, contacts) VALUES (?, ?)',
            [nom, contactsArray]
        );
        res.status(201).json({ message: 'Enregistrement réussi!', result });
    } catch (err) {
        res.status(500).send('Erreur lors de l\'ajout de la campagne');
    }
});

// Route pour obtenir toutes les campagnes
router.get('/campagnes', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM campagne');
        res.json(results);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des campagnes');
    }
});

module.exports = router;

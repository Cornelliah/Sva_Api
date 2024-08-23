const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour ajouter une nouvelle campagne
router.post('/campagnes', async (req, res) => {

    const { nom, contacts, user_id } = req.body;
    const contactsArray = contacts.join(',');

    try {
        const [result] = await db.execute(
            'INSERT INTO campagne (nom, contacts, user_id) VALUES (?, ?, ?)',
            [nom, contactsArray, user_id]
        );
        res.status(201).json({ message: 'Enregistrement réussi!', result });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la campagne:', err);
        res.status(500).send('Erreur lors de l\'ajout de la campagne');
    }
});

// Route pour obtenir toutes les campagnes
router.get('/campagnes', async (req, res) => {
    try {
        const userId = req.query.user_id; 

        const [results] = await db.execute('SELECT * FROM campagne WHERE user_id = ?', [userId]);
        res.json(results);
    } catch (err) {
        console.error('Erreur lors de la récupération des campagnes:', err);
        res.status(500).send('Erreur lors de la récupération des campagnes');
    }
});

module.exports = router;

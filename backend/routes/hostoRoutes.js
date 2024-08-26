const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour ajouter un rdv
router.post('/appointments', async (req, res) => {

    const { patientName,patientPhone,date,user_id } = req.body;
   

    try {
        const [result] = await db.execute(
            'INSERT INTO appointment (patientName,patientPhone, date,user_id ) VALUES (?,?,?,?)',
            [patientName,patientPhone,date,user_id]
        );
        res.status(201).json({ message: 'Enregistrement réussi!', result });
    } catch (err) {
        console.error('Erreur lors de l\'ajout du rdv:', err);
        res.status(500).send('Erreur lors de l\'ajout du rdv');
    }
});

// Route pour obtenir tous les rdv
router.get('/appointments', async (req, res) => {
    try {
        const userId = req.query.user_id; 

        const [results] = await db.execute('SELECT * FROM appointment WHERE user_id = ?', [userId]);
        res.json(results);
    } catch (err) {
        console.error('Erreur lors de la récupération des rdv:', err);
        res.status(500).send('Erreur lors de la récupération des rdv');
    }
});

module.exports = router;

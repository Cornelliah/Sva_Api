const express = require('express');
const router = express.Router();
const db = require('../db'); // Assurez-vous que ce chemin est correct

// Route pour récupérer les statistiques
router.get('/sending', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM statistics'); 
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour ajouter ou mettre à jour les statistiques
router.post('/update', async (req, res) => {
  const { number_of_sends, number_of_success, number_of_failures } = req.body;
  const date = new Date().toISOString().split('T')[0]; // Date au format YYYY-MM-DD

  try {
    const success_rate = number_of_sends === 0 ? 0 : (number_of_success / number_of_sends) * 100;

    const [rows] = await db.execute('SELECT * FROM statistics WHERE date = ?', [date]);

    if (rows.length > 0) {
      await db.execute(
        'UPDATE statistics SET number_of_sends = ?, number_of_success = ?, number_of_failures = ?, success_rate = ? WHERE date = ?',
        [number_of_sends, number_of_success, number_of_failures, success_rate, date]
      );
    } else {
      await db.execute(
        'INSERT INTO statistics (date, number_of_sends, number_of_success, number_of_failures, success_rate) VALUES (?, ?, ?, ?, ?)',
        [date, number_of_sends, number_of_success, number_of_failures, success_rate]
      );
    }

    res.status(200).send('Statistiques mises à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des statistiques :', error);
    res.status(500).send('Erreur serveur');
  }
});

//Récupère uniquement la dernère ligne
router.get('/latest', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM statistics ORDER BY id DESC LIMIT 1');
    
    if (rows.length === 0) {
      return res.status(404).send('Aucune statistique trouvée');
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;

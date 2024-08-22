const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); 
const secret = process.env.JWT_SECRET;


// POST /register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer l'utilisateur dans la base de données
        await db.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
        
        res.status(201).json({ message: 'Enregistrement réussi!' , token});
    } catch (err) {
        console.log (err);
        res.status(500).json({ message: 'Erreur enregistrement utilisateur', error: err });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Récupérer l'utilisateur depuis la base de données
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Email invalide' });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Mot de passe invalide' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de connexion', error: err });
    }
});


// POST /logout
router.post('/logout', (req, res) => {
    res.json({ message: 'Succès déconnexion' });
});

module.exports = router;

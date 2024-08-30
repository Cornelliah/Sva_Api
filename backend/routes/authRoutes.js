const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.JWT_SECRET;



// Middleware pour vérifier le token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];


    const token = authHeader && authHeader.split(' ')[1];



    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.error('Token verification error:', err); // Log de l'erreur de vérification
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


// Route pour obtenir les informations de l'utilisateur connecté
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findUserByEmail(req.user.email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        delete user.password;

        res.json({ userId: user.id, role:user.role });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Error fetching user data', error: err });
    }
});

module.exports = router;

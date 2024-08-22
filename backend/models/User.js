const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Créer une connexion à la base de données
const db = mysql.createPool({
    host: 'localhost',      
    user: 'root',            
    password: '',            
    database: 'feedz_database' 
});

// Fonction pour créer un nouvel utilisateur
async function createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return rows.insertId;
}

// Fonction pour trouver un utilisateur par email
async function findUserByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

module.exports = { createUser, findUserByEmail };

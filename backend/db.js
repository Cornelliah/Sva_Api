const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT 1 + 1 AS solution');
        console.log('Connected to the database. Test query result:', rows[0].solution);
        connection.release(); 
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

module.exports = pool;

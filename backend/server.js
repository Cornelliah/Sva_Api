
const express = require('express');
const cors = require('cors');
const app = express();
const cron =require('./scheduler');
require('dotenv').config();




// Configuration CORS
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
}));


app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes'); 
const headerRoutes = require('./routes/headerRoutes'); 
const campaignRoutes = require('./routes/campaignRoutes'); 
const hostoRoutes = require('./routes/hostoRoutes'); 



// Middleware pour gérer les routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/messages', messageRoutes);
app.use('/header', headerRoutes);
app.use('/marketing', campaignRoutes);
app.use('/hosto', hostoRoutes);


// Route de base
app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello, Node.js HTTP Server with Express!</h1>');
});

// Spécifier le port d'écoute
const port = 3000;

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

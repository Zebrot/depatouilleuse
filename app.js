const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/thing')
const path = require('path');

// Fix CORS 
const cors = require('cors');
const frontEndUrl = process.env.VITE_FRONTEND_URL;
app.use(cors({origin : ['https://la-depatouilleuse-front.onrender.com', frontEndUrl]})); 


mongoose.connect('connect_to_mongoDB',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use('/', (req, res, next) => {
    res.status(200).json({message : 'Bienvenue chez la dépatouilleuse !'});
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes)


module.exports = app;
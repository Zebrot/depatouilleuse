const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/blog')
const path = require('path');

require ('dotenv').config()

// Fix CORS 
const cors = require('cors');
const frontEndUrl = process.env.VITE_FRONTEND_URL;
app.use(cors({origin : ['https://la-depatouilleuse-front.onrender.com', frontEndUrl]})); 

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());


// This is the test version : I load a fake .json file of a bunch of blog posts. 
/*const blogs = require('./fakeData/blogs.json');
app.get('/', (req, res, next) => {
    res.status(200).json(blogs);
});*/

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


const stuffRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
app.use('/', stuffRoutes);
app.use('/api/auth', userRoutes)


module.exports = app;
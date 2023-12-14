const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const validator = require('validator');

const app = express();

app.use(express.json());

const homeRouter = require('./routes/home');

app.use('/home', homeRouter);

const productsRouter = require('./routes/products');

app.use('/products', productsRouter);


// On créenotre application express
// On prend en charge les intéractions avec les données type JSON

// On détaille les options pour les cors
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}  

app.use(cors(corsOptions));


app.listen('3000', () => {
    console.log('app is listening on port 3000');
})
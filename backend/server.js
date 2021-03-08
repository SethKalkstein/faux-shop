const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');

dotenv.config();
const app = express();

app.get('/', (req, res) =>{
    res.send('API is running');
})

app.get('/api/products', (req, res) =>{
    res.json(products);
    // res.send(products);  //this would do the same thing
})

app.get('/api/products/:id', (req, res) =>{
    const product = products.find( p => p._id === req.params.id);
    
    res.json(product);
})

const PORT = process.env.PORT || 666;
const MODE = process.env.NODE_ENV || "no";

app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`));
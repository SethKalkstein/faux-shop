// const express = require('express');
import express from 'express';
// const dotenv = require('dotenv');
import dotenv from 'dotenv';
// const products = require('./data/products');
import products from './data/products.js'; //files need .js extension, packages don't
import connectDB from './config/db.js';
import colors from 'colors';

dotenv.config();

connectDB();

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

app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`.yellow.bold));
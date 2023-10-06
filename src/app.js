const express = require('express');
const mongoose = require('mongoose');

const adminRoutes = require('../routes/adminRoutes');

// express app
const app = express();

// middleware to parse the request
app.use(express.json());

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://mango:mango@cluster0.9z8qyrz.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(result => { 
            app.listen(3000);
            console.log('DB CONNECTED');
        })
        .catch(err => console.log(err));

// admin routes
app.use(adminRoutes);
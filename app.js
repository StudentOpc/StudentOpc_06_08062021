const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// import {mc} from './coo'
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user')

//Module express
const app = express();


// Mise en place des options d'origine pour la lecture de l'api
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(origin)
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
// app.use(bodyParser.json());

// Route des articles
app.use('/api/stuff/', stuffRoutes);

// Route d'autentification clients
app.use('/api/auth/', userRoutes);

//Exportation du de la page "app" pour server.js
module.exports = app;

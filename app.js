const express = require("express");
const mongoose = require('mongoose');

//Module express
const app = express();

//Connexion à MongoDB
const mongooseID = require('./db/coco')
// import {mc} from './coo'

const Thing = require('./models/Thing')

app.use(express.json())

// Mise en place des options d'origine pour la lecture de l'api
app.use((req, res, next) => {
    const origin = req.headers.origin;
    console.log(origin)
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Permet d'envoyer les données entré par l'utilisateur au serveur et crée un nouvel object
app.post('/api/stuff',(req,res,next) => {

    //Supprime l'id écrit en dure dans la base de donnée
    delete req.boby._id;

    //Renvoi un tableau contenant tout les "thing" de notre base de données
    const thing = new Thing({
      ...req.body
    });
    
    // Sauvegarde les données entré de l'utilisateur dans la base de données
    thing.save()
    .then(() => res.status(201).json({message: "Object Crée"}))
    .catch(error => res.status(400).json({ error }));
    console.log(req.body);
})

// Page dynamique, trouve les données du produit dans "thing.js"
app.get('/api/stuff/:id',(req, res, next) => {

  // Trouve un élément spécifique selon son id
  Thing.findOne({_id : req.params.id})
  .then(thing => res.status(200).json( thing ))
  .catch(error => res.status(404).json({ error }))

})

app.get('/api/stuff', (req, res, next) => {
    // const stuff = [
    //   {
    //     _id: 'oeihfzeoi',
    //     title: 'Mon premier objet',
    //     description: 'Les infos de mon premier objet',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //     price: 4900,
    //     userId: 'qsomihvqios',
    //   },
    //   {
    //     _id: 'oeihfzeomoihi',
    //     title: 'Mon deuxième objet',
    //     description: 'Les infos de mon deuxième objet',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //     price: 2900,
    //     userId: 'qsomihvqios',
    //   },
    // ];
    // res.status(200).json(stuff);
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }))
  });

// app.use((req, res, next) => {
//     // const resp = res;
//     console.log("Requête reçue !");
//     next()
// });
// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });
// app.use((req, res, next) => {
//     res.json({ message: "Votre requête a bien été reçue !" });
//     next();
// });
// app.use((req, res) => {
//     console.log("Réponse envoyée avec succès");
//     next();
// });

//Exportation du de la page "app"
module.exports = app;

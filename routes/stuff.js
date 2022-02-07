const express = require("express");
const router = express.Router();
// const Thing = require('../models/Thing')
const stuffCtrl = require('../controllers/stuffCtrl');
const auth = require('../middleware/auth');
const multer =  require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing); // Crée un objet 

router.put('/:id', auth, multer, stuffCtrl.modifyThing); // Met à jour le produit ( (/:id) page crée dynamiquement )

router.delete('/:id', auth, stuffCtrl.deleteThing); // Supprime le produit ( (/:id) page crée dynamiquement )

router.get('/:id', auth, stuffCtrl.getOneThing); // Récupère un seul objet ( (/:id) page crée dynamiquement )

router.get('/', auth, stuffCtrl.getAllThings); // Récupère tout les objects

//Exporte les routes dans app.js
module.exports = router;
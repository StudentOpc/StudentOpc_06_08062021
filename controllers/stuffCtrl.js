const Thing = require('../models/Thing');

// File System
const fs = require('fs');

//POST
exports.createThing = (req, res, next) => {

  const thingObject = JSON.parse(req.body.thing);
  //Supprime l'id écrit en dure dans la base de donnée
  delete thingObject._id;
  // delete req.body._id;

  //Renvoi un tableau contenant tout les "thing" de notre base de données
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // imageUrl: req.file.filename
  });

  // Sauvegarde les données entré de l'utilisateur dans la base de données
  console.log(thingObject)
  console.log(thing)
  thing.save()
    .then(() => res.status(201).json({ message: "Object enregistré !" }))
    .catch(error => {
      console.log('Erreur de sauvegarde, save(): ', error.message);
      res.status(400).json({ error });
    });
}

//PUT
exports.modifyThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {

      if (!thing) {
        res.status(404).json({ error: new Error('Object inexistant !') });
        return
      }
      if (thing.userId !== req.auth.userId) {
        res.status(401).json({ error: new Error('Requête non autorisé !') });
        return
      }
      const filename = thing.imageUrl.split('/images')[1];
      fs.unlink(`images/${filename}`, thing => {
        // && thing.userId == req.auth.userId
        // console.log('true')
        const thingObject = req.file ?
          {

            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

          } : { ...req.body }
        //Modifi le produit
        Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: "Object Modifié !" }))
          .catch(error => {
            console.log('Erreur de modification, updateOne: ', error.message)
            res.status(400).json({ error })
          });
      });
    })
    .catch(error => {
      console.log('Erreur de recuperation {un seul objet}, findOne: ', error.message)
      res.status(400).json({ error })
    });

}

//DELETE
exports.deleteThing = (req, res, next) => {


  //Vérifie l'id de l'utilisateur avant de supprimer le produit
  Thing.findOne({ _id: req.params.id })
    .then(thing => {

      if (!thing) {
        res.status(404).json({
          error: new Error('Object inexistant !')

        });
        return
      }
      if (thing.userId !== req.auth.userId) {
        res.status(401).json({ error: new Error('Requête non autorisé !') });
        return
      }
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, thing => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Object Supprimé !' }))
          .catch(error => {
            console.log('Erreur de suppression, deleteOne: ', error.message)
            res.status(400).json({ error: error })
          });
      });
    }).catch(error => {
      console.log('Erreur de recuperation, findOne: ', error.message)
      res.status(400).json({ error: error })
    });

}

//GET
exports.getOneThing = (req, res, next) => {

  // Trouve un élément spécifique selon son id
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => {
      console.log('Erreur de recuperation {un seul objet}, getOneThing: ', error.message)
      res.status(404).json({ error })
    });
}


//GET
exports.getAllThings = (req, res, next) => {

  //Récupère tout les éléments crées
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => {
      console.log('Erreur de recuperation {tout les objets}, getAllThings: ', error.message)
      res.status(400).json({ error })
    });
}
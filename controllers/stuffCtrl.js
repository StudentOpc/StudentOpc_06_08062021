const Thing = require('../models/Thing');


//POST
exports.createThing = (req, res, next) => {

  //Supprime l'id écrit en dure dans la base de donnée
  // delete req.body._id;

  //Renvoi un tableau contenant tout les "thing" de notre base de données
  const thing = new Thing({
    ...req.body
  });

  // Sauvegarde les données entré de l'utilisateur dans la base de données
  thing.save()
    .then(() => res.status(201).json({ message: "Object Crée" }))
    .catch(error => res.status(400).json({ error }));
}

//PUT
exports.modifyThing = (req, res, next) => {

  //Modifi le produit
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Object Modifié !" }))
    .catch(error => res.status(400).json({ error }));
}

//DELETE
exports.deleteThing = (req, res, next) => {


  //Vérifie l'id de l'utilisateur avant de supprimer le produit
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (!thing) {
        res.status(404).json({
          error: new Error('Object inexistant !')
        });
      }
      if (thing.userId !== req.auth.userId) {
        res.status(401).json({ error: new Error('Requête non autorisé !') });
      }
      Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object Supprimé !' }))
        .catch(error => {
          console.log('Handling error: ', error.message)
          res.status(400).json({ error: error })
        });
    });
}

//GET
exports.getOneThing = (req, res, next) => {

  // Trouve un élément spécifique selon son id
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
}


//GET
exports.getAllThings = (req, res, next) => {

  //Récupère tout les éléments crées
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}
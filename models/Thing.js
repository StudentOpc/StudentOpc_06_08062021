const mongoose = require('mongoose');

// Shéma de mongoose (backend) qui dois être utilisé pour les requête "get"
const thingSchema = mongoose.Schema({
 title : { type: String, required: true },
 image : { type: String, required: true },
 price : { type: Number, required: true },
 userId : { type: String, required: true },
 description : { type: String, required: true },
});

//Exportation du module "mongoose"
module.exports = mongoose.model('Thing', thingSchema)
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userShema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

userShema.plugin(uniqueValidator);
// console.log(userShema);
// const justString = 'Hellow world'
// console.log(userShema.paths.email.validators.message = justString);
// console.log(userShema.paths.email.validators.message);
module.exports = mongoose.model('User', userShema);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
// const User = require('../models/User');
//Route création de compte utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 15)
        .then(hash => {
            const user = new UserModel({
                // email.value
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Compte utilisateur crée' }))
                .catch(error => {
                    console.log("Saving data user has failed:", error.message)
                    res.status(400).json({ error })
                });
        })
        .catch(error => {
            console.log("hash bcrypt compare has fail with:", error.message);
            res.status(500).json({ message: "Internal server error line: 23" })
        });

}

//Route Login Utilisateur
exports.login = (req, res, next) => {
    console.log("email: " + req.body.email);
    console.log("password: " + req.body.password);
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '12h' }
                        )
                    });
                })

                .catch(error => {
                    console.log('Handling error:', error.message)
                    res.status(500).json({ message: 'Internal server Error line: 54' })
                });
        })
        .catch(error => {
            console.log('Handling error:', error.message)
            res.status(500).json({ message: 'Internal server Error line: 59' })
        });
}
// connexion log in ID.js
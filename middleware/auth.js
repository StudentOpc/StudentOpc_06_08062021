const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        console.log(userId)
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valide !'
        } else {
            next();
        }
    } catch (error) {
        console.log('Requête non authentifiée: ', error.message)
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};
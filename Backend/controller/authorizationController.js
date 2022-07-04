require('dotenv').config()
const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {

    let token = req.headers.authorization.split(' ')[1];


    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        console.log(user)
        if (err) {
            res.sendStatus(403)
        }
        else {
            req.user = user;

        }
        next();
    })
}

module.exports = authorization;

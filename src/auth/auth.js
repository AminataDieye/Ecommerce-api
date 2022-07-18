

const User = require('../models/User')

// Middleware to check user's token for protected routes
const jwt = require('jsonwebtoken')
exports.auth = (req, res, next) => {

    const headersAuthorization = req.headers.authorization
    if (!headersAuthorization) {
        return res.json("Vous n'avez pas fourni de token")
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'PRIVATE-KEY', (err, decodedToken) => {
        if (err) {
            return res.json("L'utilisateur ne peut pas acceder à cette ressource")
        }

        const id = req.body.id
        req.user = decodedToken.userRole
        if (id && id !== decodedToken.userId) {
            return res.json("L'identifiant de l'utilisateur n'est pas valide")
        }
        else {
            next()
        }

    }
    )
}



// Middleware to check requesting user is admin or not
exports.isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.json("You're not a admin")
    }
    else {
        next()
    }

}






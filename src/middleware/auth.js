// Middleware to check user's token for protected routes
const User = require("../models/User")
// Middleware to verify user authentication
exports.auth = (req, res, next) => {
    let token = req.cookies.auth;
    User.findUserToken(token, (err, user) => {
        if (err) return res.status(400).json({
            message: "L'utilisateur ne peut pas acceder à cette ressource"
        })
        if (!user) return res.status(400).json({
            message: "Veuillez d'abord vous connecter"
        })
        req.token = token;
        req.user = user;
        next();
    })
}


// Middleware to check requesting user is admin or not
exports.isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.json("Seul l'admin a accés à cette ressource")
    }
    else {
        next()
    }

}






const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { create, update, remove, readMany, readOne } = require('../queries/CRUD')
exports.register = (req, res) => {
  create(User, req, res)
}
exports.login = (req, res, next) => {
  // get the token and check if the user is logged in or not
  let token = req.cookies.auth;

  User.findUserToken(token, (err, user) => {
    if (err) return res(err);
    if (user) return res.status(400).json("Vous êtes déja connecté");

    else {
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) { return res.status(400).json("Utilisateur introuvable") }
          // check a matching password
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            if (!isMatch) return res.status(400).json("Mot de passe incorrect")
            if (isMatch) {
              // generate a token if the password are valid 
              user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                if (user) {
                  //define a cookie with the token value
                  // every request from client to server will have this token
                  return res.cookie('auth', user.token).json({
                    message: "Connexion avec succes",
                    user
                  });
                }
              });
            }
          });
        })
        .catch(err => { return res.json("L'utilisateur n'a pu être connecté. Reéssayer") })
    }
  })
}
exports.updateUser = (req, res) => {
  update(User, req, res)
}

//delete user
exports.deleteUser = (req, res) => {
  remove(User, req, res)
}

//getAll users
exports.allUsers = (req, res) => {
  readMany(User, req, res)
}

//get profil current user
exports.oneUser = (req, res) => {
  return res.json({
    email: req.user.email,
    username: req.user.username,

  })


}
//logout user
exports.logout = (req, res) => {
  User.updateOne({ "_id": req.user.id }, { $unset: { token: 1 } }, function (err, user) {
    if (err) res.status(400).send(err);
    if (user) res.status(200).send("Deconnexion avec succes");

  })
}


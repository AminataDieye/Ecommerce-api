const User = require("../models/User")
const nodemailer = require('../config/nodemailer')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY
const { update, remove, readMany, getErrors } = require('../queries/CRUD')

exports.register = (req, res) => {
  newEntry = new User(req.body)
  newEntry.save()
    .then(newEntry => {
      const token = newEntry.generateToken('2h')
      nodemailer.sendEmailUser(req.body.email, req.body.username, token)
      res.status(200).json({ userInfos: newEntry, message: 'Check your account' })
    })
    .catch(error => {
      res.status(500).json(getErrors(error))
    })
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
          // check if the user has confirmed email
          if (!user.verified) { return res.status(400).json("Merci de confirmer votre compte") }

          // check a matching password
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            if (!isMatch) return res.status(400).json("Mot de passe incorrect")
            if (isMatch) {
              // generate and add a token to the logged in user
              const token = user.generateToken('24h')
              user.token = token
              user.save((err, user) => {
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
    username: req.user.username
  })
}
//logout user
exports.logout = (req, res) => {
  User.updateOne({ "_id": req.user.id }, { $unset: { token: 1 } }, function (err, user) {
    if (err) res.status(400).send(err);
    if (user) res.status(200).send("Deconnexion avec succes");

  })
}

//verify user
exports.verifyUser = (req, res) => {
  const token = req.params.token
  jwt.verify(token, privateKey, function (err, decode) {
    if (err) return res.send({ message: "Echec confirmation compte" });
    if (decode) {
      User.findOne({ _id: decode.userId }, function (err, user) {
        if (user) {
          user.verified = true
          user.save()
          return res.status(200).json({ message: "Merci. Vous avez confirmé votre inscription" })
        }
        if (err) return res.status(400).json({ message: "Echec confirmation compte" });
      })

    }
  }
  )
}


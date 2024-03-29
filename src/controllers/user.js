const User = require("../models/User")
const nodemailer = require('../config/nodemailer')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY
const { update, remove, readMany, getErrors } = require('../queries/CRUD')
const bcrypt = require('bcrypt')


exports.register = (req, res) => {
  newEntry = new User(req.body)
  newEntry.save()
    .then(newEntry => {
      const token = newEntry.generateToken('2h')
      nodemailer.sendEmailUser(req.body.email, req.body.username, token)
      return res.status(201).json({ userInfos: newEntry, message: 'Check your account' })
    })
    .catch(error => {
      if (error.name === "ValidationError" || error.code === 11000)
        return res.status(400).json(getErrors(error))
      return res.status(500).json(error)
    })
}

exports.login = (req, res, next) => {
  // get the token and check if the user is logged in or not
  let token = req.cookies.auth;
  User.findUserToken(token, (err, user) => {
    if (err) return res.status(500).json(err);
    if (user) return res.status(400).json({ message: "Vous êtes déja connecté" });

    //user is not logged in  
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) { return res.status(404).json({ message: "Utilisateur introuvable" }) }
        // check if the user has confirmed email
        if (!user.verified) { return res.status(400).json({ message: "Merci de confirmer votre compte" }) }

        // check a matching password
        user.comparePassword(req.body.password, function (err, isMatch) {
          // if (err) throw err
          if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" })
          if (isMatch) {
            // generate and add a token to the logged in user
            const token = user.generateToken('24h')
            user.token = token
            user.save()
              .then(user => {
                //define a cookie with the token value
                // every request from client to server will have this token
                res.cookie('auth', user.token).json({
                  message: "Connexion avec succes",
                  user
                });
              })
          }
        });
      })
      .catch(err => { return res.status(500).json({ message: "L'utilisateur n'a pu être connecté. Reéssayer" }) })

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
  res.status(200).json({
    email: req.user.email,
    username: req.user.username
  })
}
//logout user
exports.logout = (req, res) => {
  User.updateOne({ "_id": req.user.id }, { $unset: { token: 1 } }, function (err, user) {
    if (err) res.status(500).json(err);
    if (user) res.status(200).json({ message: "Deconnexion avec succes" });
  })
}

//verify user
exports.verifyUser = (req, res) => {
  const token = req.params.token
  jwt.verify(token, privateKey, function (err, decode) {
    if (decode) {
      User.findOne({ _id: decode.userId })
        .then(user => {
          if (user) {
            user.verified = true
            user.save()
            return res.status(200).json({ message: "Merci. Vous avez confirmé votre inscription" })
          }
        })
    }
    if (err) return res.status(500).json({ message: "Echec confirmation compte" });
  }
  )
}



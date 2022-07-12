const User = require("../models/User")
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

const {create,update, remove, readMany} = require('../queries/crud')

 exports.createUser = (req,res) =>
{
  create(User,req,res)
}

exports.login = (req,res) =>
{
    const password = req.body.password
    User.findOne({email:req.body.email})
    .then(user => {
        if(!user)
        {
            return res.json("Utilisateur introuvable")
        }
         // check a matching password
    user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if(isMatch)
        {
             // generate a token if the credentials are valid 
            const token=user.generateJWT()
            return res.json({mess:"Succes login", user, token})
        }
            return res.json("Mot de passe incorrect")
    });    
    } )
    .catch(err => {return res.json("L'utilisateur n'a pu être connecté. Reéssayer")})
}
exports.updateUser=(req,res) =>
{
  update(User,req,res)
}

//delete user
exports.deleteUser=(req,res)  =>
{
   remove(User,req,res)
}

//getAll User
exports.allUsers=(req,res)  =>
{
  readMany(User,req,res)
}

//getOne User

//reinitialise password




   
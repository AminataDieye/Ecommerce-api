const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const privateKey = require('../config/privateKey')
const Schema = mongoose.Schema
const userSchema = new Schema({
    username:
    {
        type: String,
        required: false,
    },
    email:
    {
        type: String,
        required: true,
        index: { unique: true }

    },
    password:
    {
        type: String,
        required: true
    },
    isAdmin:
    {
        type: Boolean,
        required: true,
        default: false
    }
    ,

    created_date:
    {
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', function (next) {
    var user = this;

    // hache le mot de passe que s'il a été modifié ou est nouveau
    if (!user.isModified('password')) return next();

    // generer un salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // utiliser le nouveau salt pour hacher le mot de passe
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//comparer password
userSchema.methods.comparePassword = function (userPassword, cb) {
    bcrypt.compare(userPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


//Generer un jeton pour l'utilisateur
userSchema.methods.generateJWT = function () {
    return jwt.sign({ userId: this._id, userRole: this.isAdmin }, privateKey, { expiresIn: '24H' })
};
module.exports = mongoose.model('User', userSchema)



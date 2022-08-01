const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY
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
        required: [true, 'Le champ email est requis'],
        index: { unique: true },
        match: [/^.+@.+\..+/, "Veuillez entrer une adresse e-mail valide"],
    },
    password:
    {
        type: String,
        required: [true, 'Le champ password est requis'],
        minlength: [5, 'Le mot de passe doit être au moins 5 caractères'],

    },
    isAdmin:
    {
        type: Boolean,
        required: true,
        default: false
    },
    token:
    {
        type: String
    },
    created_date:
    {
        type: Date,
        default: Date.now
    }
})

// hash the password by Bcrypt before saving the user
userSchema.pre('save', function (next) {
    var user = this;
    // hashes the password only if it has been changed or is new
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        // use the new salt to hash the password
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//compare password
userSchema.methods.comparePassword = function (userPassword, cb) {
    bcrypt.compare(userPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


// generate token for user
userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign({
        userId: user._id,
        userRole: user.isAdmin
    }, privateKey, { expiresIn: '24h' })

    // add the generater token to the current user
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

// find token by user
userSchema.statics.findUserToken = function (token, cb) {
    var user = this;
    jwt.verify(token, privateKey, function (err, decode) {
        if (err) cb(null)
        else {
            user.findOne({ "_id": decode.userId, "token": token }, function (err, user) {
                if (err) return cb(err);
                cb(null, user);
            })
        }
    })
};


module.exports = mongoose.model('User', userSchema)



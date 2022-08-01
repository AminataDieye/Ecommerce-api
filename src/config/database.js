const mongoose = require('mongoose')
require('dotenv').config();

//Connect and configure database mongodb cloud
const initDb = () => {
    uri = process.env.MONGO_URI
    mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
        .then(_ => { console.log("Base de données bien connectée") })
        .catch(error => { console.log("Echec connexion base de données", error) })
}
module.exports = {
    initDb
}
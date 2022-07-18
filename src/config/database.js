const mongoose = require('mongoose')
//Connect and configure database mongodb cloud
const initDb = () => {
    mongoose.connect('mongodb+srv://admin:Enter123@cluster0.kirox.mongodb.net/?retryWrites=true&w=majority',
        { useNewUrlParser: true }
    )
        .then(_ => { console.log("Base de données bien connectée") })
        .catch(error => { console.log("Echec connexion base de données", error) })
}
module.exports = {
    initDb
}
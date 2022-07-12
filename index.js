const express = require ('express')
const app = express ()
const port = 3000
const routes = require('./src/routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
app.listen(port, () => {
    console.log("Serveur demarré sur port", port)
})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use('/', routes);

//Connect and configure database mongodb cloud
mongoose.connect('mongodb+srv://admin:Enter123@cluster0.kirox.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true}
)
.then(_=> {console.log("Base de données bien connectée")})
.catch(error=> {console.log("Echec connexion base de données", error)})
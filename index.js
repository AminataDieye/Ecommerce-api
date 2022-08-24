const express = require('express')
const app = express()
const port = 3000
const routes = require('./src/routes')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { initDb } = require('./src/config/database')

app.listen(port, () => {
    console.log("Serveur demarré sur port", port)
})
app.use(cors());
app.use(cookieParser())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)
//Gestion des erreurs 404
app.use(({ res }) => {
    res.status(404).json({ message: "Cette page n'existe pas" })
})
initDb()




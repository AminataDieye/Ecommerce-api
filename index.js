const express = require('express')
const app = express()
const port = 3000
const routes = require('./src/routes')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { initDb } = require('./src/config/database')
app.listen(port, () => {
    console.log("Serveur demarré sur port", port)
})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes);
initDb()


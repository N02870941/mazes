const path     = require('path')
const express  = require('express')
const template = path.join(__dirname, 'public')
const app      = express()

app.use("/", express.static(template))

module.exports = app

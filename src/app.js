const port     = process.env.PORT || process.argv[2] || 80
const path     = require('path')
const express  = require('express')
const template = path.join(__dirname, '..', 'public')
const app      = express()

app.use("/", express.static(template))
app.listen(port, () => console.log(`Listening on port ${port}`))

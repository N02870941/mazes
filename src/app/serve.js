const port = process.env.PORT || process.argv[2] || 80
const app  = require('./app')

app.listen(port, () => console.log(`Listening on port ${port}`))

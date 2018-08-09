const port     = process.env.PORT || process.argv[2] || 80;
const path     = require('path');
const express  = require('express');
const template = path.join(__dirname, 'static');
const scripts  = path.join(__dirname, 'node_modules');
const app      = express();

//------------------------------------------------------------------------------

app.use("/", express.static(template));
app.use("/scripts", express.static(scripts));

//------------------------------------------------------------------------------

// TODO - Endpoint to save img, call jar file to solve maze

//------------------------------------------------------------------------------

app.listen(port, () => {

  console.log(`Listening on port ${port}`);
});

const port     = process.env.PORT || process.argv[2] || 80;
const path     = require('path');
const express  = require('express');
const app      = express();
const template = path.join(__dirname, 'static');
const scripts  = path.join(__dirname, 'node_modules');

//------------------------------------------------------------------------------

app.use("/", express.static(template));
app.use("/scripts", express.static(scripts));

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------

app.listen(port, () => {

  console.log(`Listening on port ${port}`);
});

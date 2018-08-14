const port     = process.env.PORT || process.argv[2] || 80;
const path     = require('path');
const express  = require('express');
const template = path.join(__dirname, 'static');
const scripts  = path.join(__dirname, 'node_modules');
const app      = express();

//------------------------------------------------------------------------------

// Serve static site, and node_module dependencies
app.use("/", express.static(template));
app.use("/scripts", express.static(scripts));

//------------------------------------------------------------------------------

// Serve on specified port
app.listen(port, () => {

  console.log(`Listening on port ${port}`);
});

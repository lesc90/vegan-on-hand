const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV == 'development')
require('dotenv').config({ silent: true });

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');

app.use(express.static(DIST_DIR));

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});

const express = require('express');
const bodyParser = require('body-parser');

const musicSugestion = require('./routes/musicSugestionRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', musicSugestion);

app.listen('3000');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const loginRouter = require('../routes/login');

app.use(bodyParser.json());

app.use('/login', loginRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

const express = require('express');

const app = express();

const loginRouter = require('../routes/login');

// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

app.use('/login', loginRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

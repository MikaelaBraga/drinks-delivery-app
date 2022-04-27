const express = require('express');

const app = express();

// app.get('/login', (_req, res) => res.status(200)));

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

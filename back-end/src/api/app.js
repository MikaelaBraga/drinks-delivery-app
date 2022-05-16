const express = require('express');
// https://www.w3schools.com/nodejs/met_path_join.asp
const path = require('path');

const app = express();

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const customerRouter = require('./routes/customer');
const sellerRouter = require('./routes/seller');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

// Acess Control
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer', customerRouter);
app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/admin', adminRouter);
app.use('/images', express.static(path.join(__dirname, '../../public/uploads/')));
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

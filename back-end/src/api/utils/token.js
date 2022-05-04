require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Método usando process.cwd() que retorna o diretório em que o comando node foi executado 
// Autoria de https://github.com/fcosta-dev em: https://github.com/tryber/sd-014-c-project-delivery-app/blob/main-group-2/back-end/src/services/authService.js

const JWT_KEY = fs.readFileSync(`${process.cwd()}/jwt.evaluation.key`);

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (id, role) => jwt.sign({ data: { id, role } }, JWT_KEY, JWT_CONFIG);

const verifyToken = (token) => jwt.verify(token, JWT_KEY, { algorithms: ['HS256'] });

module.exports = {
  generateToken,
  verifyToken
};

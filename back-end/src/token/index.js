require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (id, role) => {
  const secret = 'teste';
  const token = jwt.sign({ data: { id, role } }, secret, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};

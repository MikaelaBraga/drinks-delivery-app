const md5 = require('md5');
const { User } = require('../database/models');
const { generateToken } = require('../token');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const login = async (user) => {
  const { email, password: loginPassword } = user;
  const userFound = await getByEmail(email);
  if (!userFound) return null;
  const { id, password, role } = userFound;
  console.log(md5(loginPassword));
  console.log(password);
  if (md5(loginPassword) !== password) return null;
  const token = generateToken(id, role);
  return token;
};

module.exports = {
  login,
};

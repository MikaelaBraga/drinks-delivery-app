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
  if (md5(loginPassword) !== password) return null;
  const token = generateToken(id, role);
  return token;
};

const register = async (user) => {
  const { email, password, role: roleUser } = user;
  const userFound = await getByEmail(email);
  if (userFound) return null;
  
  let role = roleUser;
  if (!role) {
    role = 'customer';
  }

  const { id } = await User.create({ ...user, password: md5(password), role });
  
  const token = generateToken(id, role);

  return token;
};

module.exports = {
  login,
  register,
};

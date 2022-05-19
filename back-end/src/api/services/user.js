const md5 = require('md5');
const { User } = require('../../database/models');
const { generateToken } = require('../utils/token');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const removeUser = async (id) => User.destroy({ where: { id } });

const login = async (userData) => {
  const { email, password: loginPassword } = userData;
  const userFound = await getByEmail(email);
  if (!userFound) return null;

  const { id, name, password, role } = userFound;

  if (md5(loginPassword) !== password) return null;
  const token = generateToken(id, role);
  const userLogged = {
    name,
    email,
    role,
    token,
  };
  return userLogged;
};

const register = async (userData) => {
  const { name, email, password, role = 'customer' } = userData;
  const userFound = await getByEmail(email);
  if (userFound) return null;
  const newCustomer = {
    name,
    email,
    password: md5(password),
    role,
  };

  const { id } = await User.create(newCustomer);
  const token = generateToken(id, role);
  const userRegistered = {
    id,
    name,
    email,
    role,
    token,
  };
  
  return userRegistered;
};

const getSellers = async () => {
  const sellers = User.findAll({
    attributes: { exclude: ['password', 'email'] },
    where: { role: 'seller' },
  });
  return sellers;
};

module.exports = {
  getByEmail,
  login,
  removeUser,
  getAll,
  register,
  getSellers,
};

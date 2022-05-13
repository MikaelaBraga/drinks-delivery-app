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
}

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

const registerCustomer = async (userData) => {
  const { name, email, password } = userData;
  const userFound = await getByEmail(email);
  if (userFound) return null;

  const newCustomer = {
    name,
    email,
    password: md5(password),
    role: 'customer',
  };

  const { id, role } = await User.create(newCustomer);
  const token = generateToken(id, role);
  const userRegistered = {
    name,
    email,
    role,
    token,
  };
  return userRegistered;
};

// Aqui, a rota de cadastro deve ser diferente da rota de cadastro comum,
// pois também é possível definir a categoria de usuário aqui (role);

// Essa é uma rota específica para pessoa administradora, portanto a mesma
// rota na API deve considerar um token válido e referente ao usuário de categoria administrator;

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
  getAll,
  registerCustomer,
  getSellers,
};

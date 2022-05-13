const userService = require('../services/user');

const login = async (req, res) => {
  const { body: userData } = req;
  try {
    const userLogged = await userService.login(userData);
    if (!userLogged) return res.status(404).json({ message: 'invalid email or password' });
    return res.status(200).json(userLogged);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.removeUser(id);
    return res.status(204).end();
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const register = async (req, res) => {
  const { body: userData } = req;
  try {
    const userRegistered = await userService.register(userData);
    if (!userRegistered) return res.status(409).json({ message: 'E-mail already registered' });
    return res.status(201).json(userRegistered);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const getSellers = async (req, res) => {
  try {
    const sellers = await userService.getSellers();
    return res.status(200).json(sellers);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  login,
  getAll,
  register,
  getSellers,
  removeUser,
};

const userService = require('../services/user');

const login = async (req, res) => {
  const { body } = req;
  try {
    const token = await userService.login(body);
    if (!token) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(token);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const register = async (req, res) => {
  const { body } = req;
  try {
    const token = await userService.register(body);
    if (!token) return res.status(422).json({ message: 'E-mail already registered ' });

    return res.status(201).json(token);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  login,
  register
};

const userService = require('../services/user');

const login = async (req, res) => {
  const { body } = req;
  try {
    const userLogged = await userService.login(body);
    if (!userLogged) return res.status(404).json({ message: 'invalid email or password' });
    return res.status(200).json(userLogged);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const registerCustomer = async (req, res) => {
  const { body } = req;
  try {
    const token = await userService.registerCustomer(body);
    if (!token) return res.status(409).json({ message: 'E-mail already registered' });
    return res.status(201).json({ token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  login,
  registerCustomer,
};

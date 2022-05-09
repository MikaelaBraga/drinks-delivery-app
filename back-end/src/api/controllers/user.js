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

const registerCustomer = async (req, res) => {
  const { body: userData } = req;
  try {
    const userRegistered = await userService.registerCustomer(userData);
    if (!userRegistered) return res.status(409).json({ message: 'E-mail already registered' });
    return res.status(201).json(userRegistered);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const getSellers = async (req, res) => {
  try {
    const sellers = await userService.getSellers();
    if (!sellers) return res.status(404).json({ message: 'not found' });
    return res.status(200).json(sellers);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  login,
  registerCustomer,
  getSellers,
};

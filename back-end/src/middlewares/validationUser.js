const { registerCustomer } = require('../schemas/userRegister');

const validateBody = (req, res, next) => {
  const { error } = registerCustomer.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

module.exports = {
  validateBody,
};

const { verifyToken } = require('../utils/token');

const validations = (req, res, next, roleValidate) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized, token not found' });
    const decoded = verifyToken(token);
    const { data: { id, role } } = decoded;
    res.locals[`${roleValidate}Id`] = id;
    if (role !== roleValidate) {
      return res.status(401).json({ message: `Unauthorized, not ${roleValidate}` });
    }
    next();
  } catch (e) {
    return res.status(401).json('Unauthorized');
  }
};

const validationCustomer = (req, res, next) => validations(req, res, next, 'customer');

const validationSeller = (req, res, next) => validations(req, res, next, 'seller');

const validationAdmin = (req, res, next) => validations(req, res, next, 'administrator');

module.exports = {
  validationCustomer,
  validationSeller,
  validationAdmin,
};

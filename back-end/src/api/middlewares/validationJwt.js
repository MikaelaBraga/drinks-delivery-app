const { verifyToken } = require('../utils/token');

const validationCustomer = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized, token not found' });
    const decoded = verifyToken(token);
    const { data: { id, role } } = decoded;
    res.locals.userId = id;
    if (role !== 'customer') {
      return res.status(401).json({ message: 'Unauthorized, not customer' });
    }
    next();
  } catch (e) {
    return res.status(401).json('Unauthorized');
  }
};

module.exports = {
  validationCustomer,
};

const { verifyToken } = require('../utils/token');

const validationCustomer = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });
    const decoded = verifyToken(token);
    const { data: { id, role } } = decoded;
    res.locals.userId = id;
    if (role !== 'customer') {
      return res.status(401).json({ message: 'Não autorizado por não ser cliente' });
    }
    next();
  } catch (e) {
    return res.status(401).json('Não autorizado');
  }
};

module.exports = {
  validationCustomer,
};

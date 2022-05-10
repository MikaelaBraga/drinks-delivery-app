const saleService = require('../services/sale');

const post = async (req, res) => {
  const { body: sale } = req;
  try {
    const { userId } = res.locals;
    const saleId = await saleService.post({ userId, ...sale });
    return res.status(201).json({ saleId });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await saleService.getById(id);
    if (!sale) return res.status(400).json({ message: 'Not Found' });
    return res.status(200).json(sale);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const getSalesByUser = async (req, res) => {
  try {
    const { userId } = res.locals;
    const sales = await saleService.getSalesByUser(userId);
    return res.status(200).json(sales);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  post,
  getById,
  getSalesByUser,
};

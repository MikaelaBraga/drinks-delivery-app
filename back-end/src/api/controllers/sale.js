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
    const { userId } = res.locals;
    const sale = await saleService.getById(id);
    if (!sale) return res.status(400).json({ message: 'Not Found' });
    if (sale.userId !== userId) {
      return res.status(401).json({ message: 'Not the customer who ordered' });
    }
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

const updateCustomerOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await saleService.updateCustomerOrder(id);
    return res.status(200).end();
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  post,
  getById,
  getSalesByUser,
  updateCustomerOrder,
};

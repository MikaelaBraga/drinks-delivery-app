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
  getSalesByUser,
  updateCustomerOrder,
};

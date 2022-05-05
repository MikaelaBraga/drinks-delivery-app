const saleService = require('../services/sale');

const post = async (req, res) => {
  const { body } = req;
  try {
    const postedSale = await saleService.post(body);
    return res.status(201).json(postedSale);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  post,
};

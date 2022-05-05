const saleService = require('../services/sale');

const post = async (req, res) => {
  const { body: sale } = req;
  try {
    const { userId } = res.locals;
    const postedSale = await saleService.post({ userId, ...sale });
    return res.status(201).json(postedSale);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  post,
};

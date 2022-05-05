const { Sale } = require('../../database/models');

const post = async (sale) => {
  const postedSale = Sale.create(...sale);
  return postedSale;
};

module.exports = {
  post,
};

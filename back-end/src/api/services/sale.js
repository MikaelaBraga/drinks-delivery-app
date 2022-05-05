const { Sale } = require('../../database/models');

const post = async (sale) => {
  const newSale = {
    ...sale,
    saleDate: new Date(),
    status: 'Pendente',
  };
  console.log(newSale);
  const postedSale = Sale.create(newSale);
  return postedSale;
};

module.exports = {
  post,
};

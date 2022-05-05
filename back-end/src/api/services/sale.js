const { Sale } = require('../../database/models');
const { SalesProducts } = require('../../database/models');

const post = async (sale) => {
  const { products, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const newSale = {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
  };
  const { id: saleId } = await Sale.create(newSale);
  products.forEach(async ({ productId, quantity }) => {
    // Associate Sale <--> Product
    await SalesProducts.create({ saleId, productId, quantity });
  });
  return saleId;
};

module.exports = {
  post,
};

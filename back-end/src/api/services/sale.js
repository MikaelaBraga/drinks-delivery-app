const { Sale, SalesProducts } = require('../../database/models');

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

const getSalesByUser = async (userId) => {
  const sales = await Sale.findAll({
    attributes: ['id', 'status', 'saleDate', 'totalPrice'],
    where: { userId },
  });
  return sales;
};

const updateCustomerOrder = async (orderId) => {
  return await Sale.update({ status: 'Entregue' }, { where: { id: orderId } });
};

module.exports = {
  post,
  getSalesByUser,
  updateCustomerOrder,
};

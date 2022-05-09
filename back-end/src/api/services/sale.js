const { Sale, SalesProducts, Product, User } = require('../../database/models');

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
    attributes: { exclude: ['userId', 'sellerId', 'user_id', 'seller_id'] },
    where: { userId },
    include: [
      { model: User, as: 'seller', attributes: { exclude: ['password', 'email', 'role', 'id'] } },
      {
        model: Product,
        as: 'products',
        attributes: { exclude: ['id', 'url_image'] },
        through: {
          attributes: ['quantity'],
          as: 'quantity',
        },
      }],
  });
  return sales;
};

module.exports = {
  post,
  getSalesByUser,
};

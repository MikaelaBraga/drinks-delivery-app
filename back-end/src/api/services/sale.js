const { Sale, SalesProducts, User, Product } = require('../../database/models');

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

const getById = async (id, userId) => {
  const sale = await Sale.findOne({
    attributes: { exclude: ['sellerId', 'user_id', 'seller_id'] },
    where: { id },
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
  // sale not from user that's requesting
  if (sale.userId !== userId) return null;
  return sale;
};

module.exports = {
  post,
  getById,
};

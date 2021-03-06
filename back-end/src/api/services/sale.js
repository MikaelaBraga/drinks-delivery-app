const { Sale, SalesProducts, User, Product } = require('../../database/models');

const post = async (sale) => {
  const { products, customerId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const newSale = {
    userId: customerId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
  };
  console.log(newSale);
  const { id: saleId } = await Sale.create(newSale);
  products.forEach(async ({ productId, quantity }) => {
    // Associate Sale <--> Product
    await SalesProducts.create({ saleId, productId, quantity });
  });
  return saleId;
};

const getById = async (id) => {
  const sale = await Sale.findOne({
    attributes: { exclude: ['user_id', 'seller_id'] },
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
  return sale;
};

const getSalesByUser = async (customerId) => {
  const sales = await Sale.findAll({
    attributes: ['id', 'status', 'saleDate', 'totalPrice'],
    where: { userId: customerId },
  });
  return sales;
};

const getSalesBySeller = async (sellerId) => {
  const sales = await Sale.findAll({
    attributes: ['id', 'status', 'saleDate', 'totalPrice', 'deliveryAddress', 'deliveryNumber'],
    where: { sellerId },
  });
  return sales;
};

const updateSaleStatusCustomer = async (id) => {
  const sale = await Sale.findOne({ where: { id } });
  if (!sale) return null;
  sale.status = 'Entregue';
  await sale.save();
  return sale;
};

const updateSaleStatusSeller = async (id, data) => {
  const sale = await Sale.findOne({ where: { id } });
  if (!sale) return null;
  sale.status = data.status;
  await sale.save();
  return sale;
};

module.exports = {
  post,
  getById,
  getSalesByUser,
  getSalesBySeller,
  updateSaleStatusCustomer,
  updateSaleStatusSeller,
};

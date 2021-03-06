const { Product } = require('../../database/models');

const createNew = async (product) => {
  const newProduct = await Product.create(product);
  return newProduct;
};

const getAll = async () => {
  const products = await Product.findAll();
  return products;
};

const getById = async (id) => {
  const findedProduct = await Product.findOne({ where: { id } });
  if (!findedProduct) return null;
  return findedProduct;
};

const update = async (product, id) => {
  const findedProduct = await getById(id);
  if (!findedProduct) return null;
  await Product.update(product, { where: { id } });
  return product;
};

const remove = async (id) => {
  const removedProduct = await Product.destroy({ where: { id } });
  return removedProduct;
};

module.exports = {
  createNew,
  getAll,
  getById,
  update,
  remove,
};

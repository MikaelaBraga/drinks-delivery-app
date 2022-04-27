'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4,2),
    ulr_image: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
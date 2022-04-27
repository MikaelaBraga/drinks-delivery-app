'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Sale, {
        as: 'sales',
        through: salesProducts,
        foreignKey: 'product_id',
        otherKey: 'sale_id'
      })
      this.belongsToMany(models.Product, {
        as: 'products',
        through: salesProducts,
        foreignKey: 'sale_id',
        otherKey: 'product_id'
      })
    }
  }
  salesProducts.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalesProducts',
  });
  return salesProducts;
};
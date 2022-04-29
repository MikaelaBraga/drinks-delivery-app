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
      this.belongsToMany(models.Sale, 
        { as: 'sales',
          through: models.SalesProducts,
          foreignKey: 'product_id',
          otherKey: 'sale_id' 
        });
    }
  }
  Product.init({
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4,2),
    url_image: { 
      type: DataTypes.STRING(200),
      defaultValue: '',
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
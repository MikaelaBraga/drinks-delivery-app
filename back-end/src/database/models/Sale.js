'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, 
        { foreignKey: 'user_id', as: 'user' } );
      this.belongsTo(models.User, 
        { foreignKey: 'seller_id', as: 'seller' } );
      this.belongsToMany(models.Product, 
      { as: 'products',
        through: models.SalesProducts,
        foreignKey: 'saleId',
        otherKey: 'productId' 
      });
    }
  }
  Sale.init({
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING(50)
  }, {
    sequelize,
    tableName: 'sales',
    modelName: 'Sale',
    timestamps: false,
    underscored: true,
  });
  return Sale;
};
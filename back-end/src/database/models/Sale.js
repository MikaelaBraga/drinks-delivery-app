'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
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
    }
  }
  Sales.init({
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.DECIMAL(9,2),
    delivery_address: DataTypes.STRING(100),
    delivery_number: DataTypes.STRING(50),
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sales;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sale,
        { foreignKey: 'user_id', as: 'sales' });
    }
  }
  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(32),
    role: DataTypes.STRING(20)
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false,
  });
  return User;
};

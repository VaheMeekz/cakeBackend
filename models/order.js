'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    text: DataTypes.STRING(1234),
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });

  let Product = sequelize.define("Product")
  Order.belongsTo(Product,{
    foreignKey:"id"
  })
  return Order;
};
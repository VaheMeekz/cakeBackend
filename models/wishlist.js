'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WishList.init({
    product_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    quantity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WishList',
  });


  let User = sequelize.define("User");
  WishList.belongsTo(User, {
    foreignKey: "user_id",
  });

  return WishList;
};
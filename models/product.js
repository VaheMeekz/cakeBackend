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
    nameHy: DataTypes.STRING,
    nameRu: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    model: DataTypes.STRING,
    image: DataTypes.STRING(1234),
    price: DataTypes.STRING,
    descriptionHy: DataTypes.STRING(1234),
    descriptionRu: DataTypes.STRING(1234),
    descriptionEn: DataTypes.STRING(1234),
    category_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  let Category = sequelize.define("Categories");
  Product.hasOne(Category, {
    foreignKey: "category_id",
  });

  return Product;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    nameHy: DataTypes.STRING,
    nameRu: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    image:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });

  let Product = sequelize.define("Product")
  Category.belongsTo(Product,{
    foreignKey:"id"
  })
  return Category;
};
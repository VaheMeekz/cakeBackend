'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeFooter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomeFooter.init({
    image: DataTypes.STRING,
    titleHy: DataTypes.STRING,
    titleRu: DataTypes.STRING,
    titleEn: DataTypes.STRING,
    textHy: DataTypes.STRING(1234),
    textRu: DataTypes.STRING(1234),
    textEn: DataTypes.STRING(1234)
  }, {
    sequelize,
    modelName: 'HomeFooter',
  });
  return HomeFooter;
};
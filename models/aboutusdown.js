'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AboutUsDown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AboutUsDown.init({
    textHy: DataTypes.STRING(1234),
    textRu: DataTypes.STRING(1234),
    textEn: DataTypes.STRING(1234),
    imgOne: DataTypes.STRING,
    imgTwo: DataTypes.STRING,
    imgThree: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AboutUsDown',
  });
  return AboutUsDown;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PortfolioVideos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PortfolioVideos.init({
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PortfolioVideos',
  });
  return PortfolioVideos;
};
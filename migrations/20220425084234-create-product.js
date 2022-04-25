'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameHy: Sequelize.STRING,
      nameRu: Sequelize.STRING,
      nameEn: Sequelize.STRING,
      model: Sequelize.STRING,
      image: Sequelize.STRING(1234),
      price: Sequelize.STRING,
      descriptionHy: Sequelize.STRING(1234),
      descriptionRu: Sequelize.STRING(1234),
      descriptionEn: Sequelize.STRING(1234),
      category_id: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
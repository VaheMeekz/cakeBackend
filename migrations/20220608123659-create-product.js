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
      nameHy: {
        type: Sequelize.STRING
      },
      nameRu: {
        type: Sequelize.STRING
      },
      nameEn: {
        type: Sequelize.STRING
      },
      descriptionHy: {
        type: Sequelize.STRING(1234)
      },
      descriptionRu: {
        type: Sequelize.STRING(1234)
      },
      descriptionEn: {
        type: Sequelize.STRING(1234)
      },
      video: {
        type: Sequelize.STRING
      },
      categoryId:Sequelize.INTEGER,
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
'use strict';
const aboutUs = require('../utils/data').aboutUs

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('AboutUs', aboutUs, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AboutUs', null, {});
  }
};

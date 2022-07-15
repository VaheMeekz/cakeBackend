'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('HomeBanners', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image: {
                type: Sequelize.STRING
            },
            titleHy:Sequelize.STRING,
            titleRu:Sequelize.STRING,
            titleEn:Sequelize.STRING,
            textHy: Sequelize.STRING(1234),
            textRu: Sequelize.STRING(1234),
            textEn: Sequelize.STRING(1234),
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
        await queryInterface.dropTable('HomeBanners');
    }
};
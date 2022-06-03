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
            titleHy: {
                type: Sequelize.STRING
            },
            titleEn: {
                type: Sequelize.STRING
            },
            titleRu: {
                type: Sequelize.STRING
            },
            subTitleHy: {
                type: Sequelize.STRING
            },
            subTitleEn: {
                type: Sequelize.STRING
            },
            subTitleRu: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
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
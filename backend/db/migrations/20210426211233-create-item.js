'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      originalPrice_USD: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceToRent_USD: {
        type: Sequelize.INTEGER,

      },
      priceToBuy_USD: {
        type: Sequelize.INTEGER
      },
      sizeSInventory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0
      },
      sizeMInventory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0
      },
      sizeLInventory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0
      },
      designerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Designers"}
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Categories'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};

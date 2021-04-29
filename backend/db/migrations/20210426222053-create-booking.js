'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      startDate: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      returnDate: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      rent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      buy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Items'}
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users'}
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
    return queryInterface.dropTable('Bookings');
  }
};

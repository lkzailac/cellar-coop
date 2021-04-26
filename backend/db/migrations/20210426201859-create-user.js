'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(100)
      },
      lastName: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        isEmail: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      height_in: {
        type: Sequelize.INTEGER
      },
      weight_lbs: {
        type: Sequelize.INTEGER
      },
      dressSize: {
        type: Sequelize.STRING(1),
        isIn: [['s', 'm', 'l']]
      },
      jeanSize: {
        type: Sequelize.INTEGER,
        isIn: [[2, 4, 6, 8, 10, 12]]
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
    return queryInterface.dropTable('Users');
  }
};

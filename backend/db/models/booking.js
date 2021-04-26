'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    size: {
      type: Sequelize.STRING(1),
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    returnDate: {
      type: Sequelize.DATE,
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
    price_USD: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    itemId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId'})
    Booking.belongsTo(models.Item, { foreignKey: 'itemId'})
  };
  return Booking;
};

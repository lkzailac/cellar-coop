'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    size: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    buy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    price_USD: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId'})
    Booking.belongsTo(models.Item, { foreignKey: 'itemId'})
  };
  return Booking;
};

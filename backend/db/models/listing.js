'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {});
  Listing.associate = function(models) {
    // associations can be defined here
  };
  return Listing;
};
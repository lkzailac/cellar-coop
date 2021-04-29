'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {});
  Listing.associate = function(models) {
    Listing.belongsTo(models.User, {foreignKey: 'userId'});
    Listing.belongsTo(models.Item, {foreignKey: 'itemId'})
  };
  return Listing;
};

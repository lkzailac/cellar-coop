'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    photo: DataTypes.STRING,
    description: DataTypes.TEXT,
    originalPrice_USD: DataTypes.INTEGER,
    priceToRent_USD: DataTypes.INTEGER,
    priceToBuy_USD: DataTypes.INTEGER,
    sizeSInventory: DataTypes.INTEGER,
    sizeMInventory: DataTypes.INTEGER,
    sizeLInventory: DataTypes.INTEGER,
    designerId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    //many to many users
    Item.belongsToMany(models.User, {through: "Listing", foreignKey: 'itemId', otherKey: 'userId'})
    //one to many
    Item.belongsTo(models.Designer, {foreignKey: 'designerId'});
    Item.belongsTo(models.Category, { foreignKey: 'categoryId'});

  };
  return Item;
};

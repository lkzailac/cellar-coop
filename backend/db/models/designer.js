'use strict';
module.exports = (sequelize, DataTypes) => {
  const Designer = sequelize.define('Designer', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Designer.associate = function(models) {
    // associations can be defined here
  };
  return Designer;
};

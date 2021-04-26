'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING(100),
    lastName: DataTypes.STRING(100),
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      isEmail: true,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [6, 60],
      }
    },
    height_in: DataTypes.INTEGER,
    weight_lbs: DataTypes.INTEGER,
    dressSize: {
      type: DataTypes.STRING,
      isIn: [['s', 'm', 'l']]
    },
    jeanSize: {
      type: DataTypes.INTEGER,
      isIn: [[2, 4, 6, 8, 10, 12]]
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

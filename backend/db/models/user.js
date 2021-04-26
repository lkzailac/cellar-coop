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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword']}
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  User.associate = function(models) {
    // many to many items
    User.belongsToMany(models.Item, {through: 'Listing', foreignKey: 'userId', otherKey: 'itemId'}),
    User.hasMany(models.Booking, { foreignKey: 'userId'})
  };

  //instance methods
  //returns items safe to save to a JWT
  User.prototype.toSafeObject = function() {
    const {id, email} = this;
    return {id, email};
  }
  //compares signed up user's password to their saved hash
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  //static methods
  User.getCurrentUserById = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  }

  User.login = async function ({ email, password }) {

    const user = await User.scope('loginUser').findOne({
      where: { email },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };



  return User;
};

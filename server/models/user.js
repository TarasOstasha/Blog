'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Name cannot be null
        validate: {
          notNull: {
            msg: 'Name is required',
          },
          notEmpty: {
            msg: 'Name cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Email cannot be null
        unique: {
          msg: 'Email address already in use', // Email must be unique
        },
        validate: {
          isEmail: {
            msg: 'Must be a valid email address',
          },
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email cannot be empty',
          },
          is: {
            args: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            msg: 'Must be a valid email format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Password cannot be null
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          len: {
            args: [8, 128], // Password must be between 8 and 128 characters
            msg: 'Password must be between 8 and 128 characters',
          },
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'User',
    }
  );

  return User;
};

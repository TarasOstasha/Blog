'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gallery.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures the title is not an empty string
          len: [3, 255], // Ensures the title length is between 3 and 255 characters
        },
        unique: {
          args: true,
          msg: 'Title must be unique', // Custom error message for unique constraint
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures the author is not an empty string
          len: [3, 255], // Ensures the author length is between 3 and 255 characters
        },
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures the file path is not an empty string
          isUrl: false, // Ensures that the file path does not get mistaken for a URL
          is: /\.(png|jpg|jpeg|gif)$/i, // Regex to ensure the file path ends with a valid image extension
        },
      },
    },
    {
      sequelize,
      modelName: 'Gallery',
      underscored: true,
    }
  );
  return Gallery;
};

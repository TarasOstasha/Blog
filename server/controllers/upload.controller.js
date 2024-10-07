const createError = require('http-errors');
const { Gallery } = require('./../models');
const _ = require('lodash');
const IMG_PATH = '/images/gallery/';

module.exports.uploadImg = async (req, res, next) => {
  const { title, author } = req.body; // Text fields sent with the form
  const { filename: fileName } = req.file; // The uploaded file
  console.log(req.file);
  if (!fileName) {
    return res.status(400).json({ message: 'Image upload failed' });
  }

  try {
    const newImage = await Gallery.create({
      title,
      author,
      fileName: `${IMG_PATH}${fileName}`,
    });

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: `${IMG_PATH}${fileName}`, // Path to the image
      title,
      author,
      image: newImage, // Return the saved image data
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getImgs = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const foundImgs = await Gallery.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude these fields
      raw: true, // Return raw data instead of Sequelize instances
      limit: parseInt(limit, 10), // Ensure limit is an integer
      offset: parseInt(offset, 10), // Ensure offset is an integer
      order: [['id', 'ASC']],
    });
    res.status(200).json({
      data: foundImgs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getImgById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundUser = await Gallery.findByPk(id);
    if (!foundUser) {
      return next(createHttpError(404, createHttpError(404, 'User Not Found')));
    }
    res.status(200).send({ data: foundUser });
  } catch (error) {
    next(createHttpError(404, createHttpError(404, 'User Not Found')));
  }
};

module.exports.updateImgById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  console.log(body, id);
  try {
    const [updatedImgCount, [updatedImg]] = await Gallery.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedImgCount) {
      return next(createError(404, 'Image not found!'));
    }

    const preparedImage = _.omit(updatedImg, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedImage });
  } catch (error) {
    next(error);
  }
};

module.exports.removeImg = async (req, res, next) => {
  const { id } = req.params;
  console.log(id, '<< ID');
  try {
    const deletedImg = await Gallery.destroy({ where: { id } });
    if (!deletedImg) {
      return next(createHttpError(404, 'Image Not Found'));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

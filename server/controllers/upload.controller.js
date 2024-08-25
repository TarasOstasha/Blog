const { Gallery } = require('./../models');

exports.uploadImg = async (req, res, next) => {
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
      fileName: `/images/gallery/${fileName}`,
    });

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: `/images/gallery/${fileName}`, // Path to the image
      title,
      author,
      image: newImage, // Return the saved image data
    });
  } catch (error) {
    next(error);
  }
};

// exports.getImgs = async (req, res, next) => {
//   try {
//     const foundImgs = await Gallery.findAll({
//       raw: true,
//     });
//     res.status(200).send({
//       data: foundImgs,
//       //attributes: { exclude: ['createdAt', 'updatedAt'] },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.getImgs = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const foundImgs = await Gallery.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude these fields
      raw: true, // Return raw data instead of Sequelize instances
      limit: parseInt(limit, 10), // Ensure limit is an integer
      offset: parseInt(offset, 10), // Ensure offset is an integer
    });
    res.status(200).json({
      data: foundImgs,
    });
  } catch (error) {
    next(error);
  }
};

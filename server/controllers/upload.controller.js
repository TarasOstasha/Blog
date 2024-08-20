exports.uploadImg = (req, res) => {
  const { title, author } = req.body; // Text fields sent with the form
  const image = req.file; // The uploaded file
  if (!image) {
    return res.status(400).json({ message: 'Image upload failed' });
  }

  // Handle the uploaded image, e.g., save information to the database

  res.status(200).json({
    message: 'File uploaded successfully',
    fileUrl: `/images/gallery/${image.filename}`, // Path to the image
    title,
    author,
  });
};

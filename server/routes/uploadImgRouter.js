const multer = require('multer');
const { Router } = require('express');
const { uploadImgController } = require('../controllers');
const path = require('path');
const fs = require('fs');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../public/images/gallery');
    fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp
  },
});

// Initialize multer with the storage settings
const upload = multer({ storage });

// Define the router
const uploadImgRouter = Router();

uploadImgRouter
  .route('/')
  .post(upload.single('image'), uploadImgController.uploadImg);

module.exports = uploadImgRouter;

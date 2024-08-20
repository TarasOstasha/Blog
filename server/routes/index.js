const { Router } = require('express');

const authRouter = require('./authRouter');
const uploadImgRouter = require('./uploadImgRouter');

const router = Router();

// api
router.use('/auth', authRouter);
router.use('/upload', uploadImgRouter);

module.exports = router;

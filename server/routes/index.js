const { Router } = require('express');

const authRouter = require('./authRouter');
const uploadImgRouter = require('./uploadImgRouter');
const usersRouter = require('./usersRouter');

const router = Router();

// api
router.use('/auth', authRouter);
router.use('/upload', uploadImgRouter);
router.use('/users', usersRouter);

module.exports = router;

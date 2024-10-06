const { Router } = require('express');
const { authController } = require('../controllers');
const { validate } = require('../middleware');

//const { paginate, upload } = require('../middleware');

// api/auth
const authRouter = Router();

authRouter
  .route('/signup')
  .post(validate.validateUserOnCreate, authController.registerUser);

authRouter
  .route('/login')
  .post(validate.validateUserOnLogin, authController.loginUser);

// authRouter
//   .route('/:id')
//   .get(authController.getOrderById)

module.exports = authRouter;

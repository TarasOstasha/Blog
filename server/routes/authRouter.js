const { Router } = require('express');
const { authController } = require('../controllers');

//const { paginate, upload } = require('../middleware');

// api/auth
const authRouter = Router();

authRouter
  .route('/signup')
  //.get(authController.getUsers)
  .post(authController.registerUser);

// authRouter
//   .route('/:id')
//   .get(authController.getOrderById)

module.exports = authRouter;

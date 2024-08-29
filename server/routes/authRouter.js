const { Router } = require('express');
const { authController } = require('../controllers');

//const { paginate, upload } = require('../middleware');

// api/auth
const authRouter = Router();

authRouter.route('/signup').post(authController.registerUser);

authRouter.route('/login').post(authController.loginUser);

// authRouter
//   .route('/:id')
//   .get(authController.getOrderById)

module.exports = authRouter;

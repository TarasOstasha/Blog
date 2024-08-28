const bcrypt = require('bcrypt');
const _ = require('lodash');
const createHttpError = require('http-errors');
const { User } = require('./../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Step 1: Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      // User does not exist
      return next(createHttpError(400, 'Invalid email or password'));
    }

    // Step 2: Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Password does not match
      return next(createHttpError(400, 'Invalid email or password'));
    }

    // Step 3: Generate a JWT (or start a session if using sessions)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Use a secret key from your environment variables
      { expiresIn: '1h' } // Token expiration time
    );

    // Step 4: Send the token and user data to the client
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle error
    if (error.response) {
      return next(
        createHttpError(
          error.response.status,
          'Server responded with a non-2xx status'
        )
      );
    } else if (error.request) {
      return next(createHttpError(504, 'No response received from the server'));
    } else {
      return next(createHttpError(500, 'Internal Server Error'));
    }
  }
};

module.exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const responseUser = _.omit(newUser.toJSON(), ['createdAt', 'updatedAt']);
    res.status(201).json({
      message: 'User registered successfully!',
      data: responseUser,
      token,
    });
  } catch (error) {
    if (error.response) {
      return next(
        createHttpError(
          error.response.status,
          'Server responded with a non-2xx status'
        )
      );
    } else if (error.request) {
      return next(createHttpError(504, 'No response received from the server'));
    } else {
      return next(createHttpError(500, 'Internal Server Error'));
    }
  }
};

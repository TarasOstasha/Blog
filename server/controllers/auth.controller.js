const bcrypt = require('bcrypt');
const _ = require('lodash');
const createHttpError = require('http-errors');
const { User } = require('./../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const chalk = require('chalk');

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createHttpError(400, 'Invalid email or password'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createHttpError(400, 'Invalid email or password'));
    }
    const { id, name, email: userEmail } = user;
    const token = jwt.sign(
      { userId: id, name, email: userEmail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id,
        name,
        email: userEmail,
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
      role: 'user',
    });
    console.log(chalk.blue(newUser), '<< newUser');
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const responseUser = _.omit(newUser.toJSON(), ['createdAt', 'updatedAt']);
    console.log(responseUser, '<< responseUser');
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

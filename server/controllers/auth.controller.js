const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
//const User = require('../models/User'); // Assuming you have a User model
const jwt = require('jsonwebtoken');

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
      { expiresIn: '1h' }, // Token expiration time
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
          'Server responded with a non-2xx status',
        ),
      );
    } else if (error.request) {
      return next(createHttpError(504, 'No response received from the server'));
    } else {
      return next(createHttpError(500, 'Internal Server Error'));
    }
  }
};

module.exports.registerUser = async (req, res, next) => {
  const { body } = req;
  console.log(body);
  try {
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // Hash password and save user to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    //const newUser = new User({ name, email, password: hashedPassword });
    //await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    // Handle error
    if (error.response) {
      return next(
        createHttpError(
          error.response.status,
          'Server responded with a non-2xx status',
        ),
      );
    } else if (error.request) {
      return next(createHttpError(504, 'No response received from the server'));
    } else {
      return next(createHttpError(500, 'Internal Server Error'));
    }
  }
};

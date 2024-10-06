const {
  CREATE_USER_VALIDATION_SCHEMA,
  LOGIN_USER_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validateUserOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedUser = await CREATE_USER_VALIDATION_SCHEMA.validate(body);
    req.body = validatedUser;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateUserOnLogin = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedUser = await LOGIN_USER_VALIDATION_SCHEMA.validate(body);
    req.body = validatedUser;
    next();
  } catch (err) {
    next(err);
  }
};

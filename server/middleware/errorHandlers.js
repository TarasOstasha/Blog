const { ValidationError, BaseError } = require('sequelize');
const createHttpError = require('http-errors');

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors = err.errors.map((err) => ({
      status: 422,
      title: err.message,
    }));
    return res.status(422).send(errors);
  } else if (err instanceof BaseError) {
    return next(createHttpError(500, 'Database Error'));
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(status).send([{ status, message }]);
};

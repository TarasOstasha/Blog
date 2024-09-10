const yup = require('yup');

const NAME_VALIDATION_SCHEMA = yup
  .string()
  .trim()
  .min(2)
  .max(16)
  .matches(/^[A-Z][a-z]{1,15}$/);

const EMAIL_VALIDATION_SCHEMA = yup
  .string()
  .trim()
  .email('Must be a valid email address')
  .required('Email is required');

module.exports.CREATE_USER_VALIDATION_SCHEMA = yup.object({
  name: NAME_VALIDATION_SCHEMA.required(),
  email: EMAIL_VALIDATION_SCHEMA.required(),
  password: yup.string().min(4).required(),
});

module.exports.LOGIN_USER_VALIDATION_SCHEMA = yup.object({
  email: EMAIL_VALIDATION_SCHEMA.required(),
  password: yup.string().min(4).required(),
});

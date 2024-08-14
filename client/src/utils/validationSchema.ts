import * as yup from 'yup';

// export const AUTH_VALIDATION_SCHEMA = yup.object({
//     name: yup
//     .string()
//     .min(2, 'Name must be at least 2 characters')
//     .required('Name is required'),

//     email: yup
//       .string()
//       .matches(
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         'Invalid email format'
//       )
//       .required('Email is required'),

//     password: yup
//       .string()
//       .min(6, 'Password must be at least 6 characters long')
//       .required('Password is required'),

//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref('password')], 'Passwords must match')
//       .required('Confirm Password is required'),
//   });

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const GALERY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  image: yup.mixed().required('Image is required'),
});

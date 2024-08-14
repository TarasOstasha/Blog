import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { connect, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography } from '@mui/material';
import classnames from 'classnames';
import styles from './Auth.module.scss';
import {
  LOGIN_VALIDATION_SCHEMA,
  SIGNUP_VALIDATION_SCHEMA,
} from '../../utils/validationSchema';

import { RootState, AppDispatch } from '../../store';
import {
  loginUserThunk,
  signupUserThunk,
  //getUserDataThunk,
} from '../../store/slices/authSlice';
//import { AuthData, AuthProps } from '../../interfaces';

// interface UserData {
//   id: string; // Unique identifier for the user
//   name: string; // User's name (used during registration)
//   email: string; // User's email (used for both login and registration)
//   password?: string; // User's password (optional, depending on the context)
//   confirmPassword?: string; // Only used during registration, not stored permanently
//   token?: string; // JWT or session token (after login or registration)
//   role?: string; // User's role within the system
// }

interface LoginUserData {
  email: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type AuthData = LoginUserData | RegisterUserData;

//const Auth:React.FC<AuthProps> = ({ loginUser, signupUser, getUser }) => {
// const Auth1: React.FC<any> = ({
//   //getUser,
//   signupUser,
//   loginUser,
//   userData,
//   //userData: { name },
// }) => {
//   const [isLogin, setIsLogin] = useState(true);

//   const initialValues: AuthData = {
//     //id: '',
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   };

//   useEffect(() => {
//     //   const storedAuthData = localStorage.getItem('authData');
//     //   if (storedAuthData) {
//     //       const parsedAuthData = JSON.parse(storedAuthData);
//     //       console.log(parsedAuthData);
//     //   }
//   }, []);

//   const handleFormSubmit = (
//     values: AuthData,
//     { resetForm }: FormikHelpers<AuthData>
//   ) => {
//     if (isLogin) {
//       const loginData: LoginUserData = {
//         email: values.email,
//         password: values.password,
//       };
//       loginUser(loginData.email, loginData.password);
//     } else {
//       // Here we know values is of type RegisterUserData
//       const registerData: RegisterUserData = {
//         name: (values as RegisterUserData).name, // Type assertion
//         email: values.email,
//         password: values.password,
//         confirmPassword: (values as RegisterUserData).confirmPassword, // Type assertion
//       };
//       signupUser(registerData.name, registerData.email, registerData.password);
//     }
//     //resetForm();
//   };
//   return (
//     <Container maxWidth="sm">
//       <div className={styles['auth-container']}>
//         <Typography variant="h4" gutterBottom className={styles['auth-title']}>
//           {isLogin ? 'Login' : 'Sign Up'}
//         </Typography>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={
//             isLogin ? LOGIN_VALIDATION_SCHEMA : SIGNUP_VALIDATION_SCHEMA
//           }
//           onSubmit={handleFormSubmit}
//         >
//           {({ errors, touched }) => (
//             <Form className={styles['auth-form']}>
//               {!isLogin && (
//                 <Field
//                   as={TextField}
//                   name="name"
//                   label="Name"
//                   type="text"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   placeholder="Name"
//                   className={classnames({
//                     [styles['auth-field']]: true,
//                     [styles['error-field']]: errors.name && touched.name,
//                   })}
//                   helperText={touched.name && errors.name}
//                   error={touched.name && Boolean(errors.name)}
//                 />
//               )}
//               <Field
//                 as={TextField}
//                 name="email"
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 className={classnames({
//                   'auth-field': true,
//                   'error-field': errors.email && touched.email,
//                 })}
//                 helperText={touched.email && errors.email}
//                 error={touched.email && Boolean(errors.email)}
//               />
//               <Field
//                 as={TextField}
//                 name="password"
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 className={classnames({
//                   'auth-field': true,
//                   'error-field': errors.password && touched.password,
//                 })}
//                 helperText={touched.password && errors.password}
//                 error={touched.password && Boolean(errors.password)}
//               />
//               {!isLogin && (
//                 <Field
//                   as={TextField}
//                   name="confirmPassword"
//                   label="Confirm Password"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   className={classnames({
//                     'auth-field': true,
//                     'error-field':
//                       errors.confirmPassword && touched.confirmPassword,
//                   })}
//                   helperText={touched.confirmPassword && errors.confirmPassword}
//                   error={
//                     touched.confirmPassword && Boolean(errors.confirmPassword)
//                   }
//                 />
//               )}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 className="auth-button"
//               >
//                 {isLogin ? 'Login' : 'Sign Up'}
//               </Button>
//             </Form>
//           )}
//         </Formik>
//         <Button
//           onClick={() => setIsLogin(!isLogin)}
//           className={styles['auth-toggle']}
//         >
//           {isLogin
//             ? "Don't have an account? Sign Up"
//             : 'Already have an account? Login'}
//         </Button>
//       </div>
//     </Container>
//   );
// };

const mapStateToProps = (state: RootState) => ({
  userData: state.auth.authData,
  isFetching: state.auth.isFetching,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  //getUser: (email: string) => dispatch(getUserDataThunk(email)),
  loginUser: (email: string, password: string) =>
    dispatch(loginUserThunk({ email, password })),
  signupUser: (name: string, email: string, password: string) =>
    dispatch(signupUserThunk({ name, email, password })),
});

//export default connect(mapStateToProps, mapDispatchToProps)(Auth1);

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { connect, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography } from '@mui/material';
import classnames from 'classnames';
import styles from './Auth.module.scss';
import { LOGIN_VALIDATION_SCHEMA } from '../../utils/validationSchema';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';

interface LoginUserData {
  email: string;
  password: string;
}
// interface LoginProps {
//     userData: userData[];
//     isFetching: boolean;
//     error: string | null;
//     loginUser: (email: string, password: string) => void;
//   }

const Login: React.FC<any> = ({ loginUser, userData, isFetching, error }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const initialValues: LoginUserData = {
    email: '',
    password: '',
  };

  const handleFormSubmit = (
    values: LoginUserData,
    { resetForm }: FormikHelpers<LoginUserData>
  ) => {
    console.log(values, '<< values login');
    loginUser(values.email, values.password);
    // resetForm(); // Uncomment if you want to reset the form after submission
  };

  return (
    <Container maxWidth="sm">
      <div className={styles['auth-container']}>
        <Typography variant="h4" gutterBottom className={styles['auth-title']}>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles['auth-form']}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                className={classnames({
                  'auth-field': true,
                  'error-field': errors.email && touched.email,
                })}
                helperText={touched.email && errors.email}
                error={touched.email && Boolean(errors.email)}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                className={classnames({
                  'auth-field': true,
                  'error-field': errors.password && touched.password,
                })}
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="auth-button"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          onClick={() => {
            setIsLogin(!isLogin);
            navigate('/register');
          }}
          className={styles['auth-toggle']}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </Button>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  userData: state.auth.authData,
  isFetching: state.auth.isFetching,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loginUser: (email: string, password: string) =>
    dispatch(loginUserThunk({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { connect, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography } from '@mui/material';
import classnames from 'classnames';
import styles from './Auth.module.scss';
import { SIGNUP_VALIDATION_SCHEMA } from '../../utils/validationSchema';
import { useNavigate } from 'react-router-dom';
import { signupUserThunk } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Register: React.FC<any> = ({ signupUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const initialValues: RegisterUserData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleFormSubmit = (
    values: RegisterUserData,
    { resetForm }: FormikHelpers<RegisterUserData>
  ) => {
    //console.log(values, '<< values register');
    signupUser(values.name, values.email, values.password);
    resetForm(); // Uncomment if you want to reset the form after submission
  };

  return (
    <Container maxWidth="sm">
      <div className={styles['auth-container']}>
        <Typography variant="h4" gutterBottom className={styles['auth-title']}>
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={SIGNUP_VALIDATION_SCHEMA}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles['auth-form']}>
              <Field
                as={TextField}
                name="name"
                label="Name"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Name"
                className={classnames({
                  [styles['auth-field']]: true,
                  [styles['error-field']]: errors.name && touched.name,
                })}
                helperText={touched.name && errors.name}
                error={touched.name && Boolean(errors.name)}
              />
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
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                className={classnames({
                  'auth-field': true,
                  'error-field':
                    errors.confirmPassword && touched.confirmPassword,
                })}
                helperText={touched.confirmPassword && errors.confirmPassword}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="auth-button"
              >
                SignUp
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          onClick={() => {
            setIsLogin(!isLogin);
            navigate('/login');
          }}
          className={styles['auth-toggle']}
        >
          {isLogin
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
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
  signupUser: (name: string, email: string, password: string) =>
    dispatch(signupUserThunk({ name, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { connect, useSelector } from "react-redux";
import { TextField, Button, Container, Typography } from '@mui/material';
import classnames from 'classnames';
import styles from './Auth.module.scss';
import { LOGIN_VALIDATION_SCHEMA, SIGNUP_VALIDATION_SCHEMA } from '../../utils/validationSchema';

import { RootState, AppDispatch } from '../../store';
import { getAuthDataThunk, loginUserThunk, signupUserThunk } from '../../store/slices/authSlice';
import { AuthData, AuthProps } from '../../interfaces';



//const Auth:React.FC<AuthProps> = ({ loginUser, signupUser, getUser }) => {
const Auth:React.FC<any> = ({ getUser, signupUser, loginUser, userData: { name } }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [login, setLogin] = useState('');
    const initialValues: AuthData = { name: '', email: '', password: '', confirmPassword: '' }
    console.log(isLogin);


    // useEffect(() => {
    //     const storedAuthData = localStorage.getItem('authData');
    //     if (storedAuthData) {
    //         const parsedAuthData = JSON.parse(storedAuthData);
    //         console.log(parsedAuthData);
    //     }
    // }, []);

    const handleFormSubmit = (values: AuthData, { resetForm }: FormikHelpers<AuthData>) => {
        if (isLogin) {
            loginUser(values.email, values.password);
        } else {
            signupUser(values.name, values.email, values.password);
        }
        //resetForm();
      };
    return (
        <Container maxWidth="sm">
        <div className={styles['auth-container']}>
            <Typography variant="h4" gutterBottom className={styles['auth-title']}>
            {isLogin ? 'Login' : 'Sign Up'}
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={isLogin ? LOGIN_VALIDATION_SCHEMA : SIGNUP_VALIDATION_SCHEMA}
                onSubmit={handleFormSubmit}
            >
            {({ errors, touched }) => (
                <Form className={styles['auth-form']}>
                {!isLogin && (  
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
                )}
                <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className={classnames({ 'auth-field': true, 'error-field': errors.email && touched.email })}
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
                    className={classnames({ 'auth-field': true, 'error-field': errors.password && touched.password })}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                />
                {!isLogin && (
                    <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className={classnames({ 'auth-field': true, 'error-field': errors.confirmPassword && touched.confirmPassword })}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    />
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth className="auth-button">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>
                </Form>
            )}
            </Formik>
            <Button
                onClick={() => setIsLogin(!isLogin)}
                className={styles['auth-toggle']}
            >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </Button>
        </div>
        </Container>
  )
}


const mapStateToProps = (state: RootState) => ({
    userData: state.auth.authData,
    isFetching: state.auth.isFetching,
    error: state.auth.error,
  });

  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUser: (id: string) => dispatch(getAuthDataThunk(id)),
    loginUser: (email: string, password: string) => dispatch(loginUserThunk({ email, password })),
    signupUser: (name: string, email: string, password: string) => dispatch(signupUserThunk({ name, email, password })),
  });



export default connect(mapStateToProps, mapDispatchToProps)(Auth)
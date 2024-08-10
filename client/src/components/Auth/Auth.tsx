import React, { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography } from '@mui/material';
import classnames from 'classnames';
import styles from './Auth.module.scss';
import { AUTH_VALIDATION_SCHEMA } from '../../utils/validationSchema';


export interface AuthData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}


const Auth:React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const initialValues: AuthData = { name: '', email: '', password: '', confirmPassword: '' }

    const handleFormSubmit = (values: AuthData, { resetForm }: FormikHelpers<AuthData>) => {
        // Handle form submission here
        console.log(values);
      };
  return (
    <Container maxWidth="sm">
      <div className={styles['auth-container']}>
        <Typography variant="h4" gutterBottom className={styles['auth-title']}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={AUTH_VALIDATION_SCHEMA}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles['auth-form']}>
              {!isLogin && (  // Conditionally render the Name field for signup only
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

export default Auth
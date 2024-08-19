import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField, Button, Container, Typography } from '@mui/material';
import { GALERY_FORM_VALIDATION_SCHEMA } from '../../utils/validationSchema';
import { uploadGalley } from '../../api';
import { FormValues } from '../../interfaces';

const initialValues: FormValues = {
  title: '',
  author: '',
  image: null,
};

const GalleryForm: React.FC = () => {
  const handleSubmit = async (
    values: FormValues,
    formikBag: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('image', values.image as File);

      const response = await uploadGalley(formData);
      console.log('Success:', response);

      formikBag.resetForm();
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Upload Image
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={GALERY_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <Field
                as={TextField}
                name="author"
                label="Author"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.author && Boolean(errors.author)}
                helperText={touched.author && errors.author}
              />
              <input
                accept="image/*"
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  if (files && files.length > 0) {
                    setFieldValue('image', files[0]);
                  } else {
                    setFieldValue('image', null); // Handle the case where no file is selected
                  }
                }}
                style={{ marginTop: '16px', marginBottom: '16px' }}
              />
              {touched.image && errors.image && (
                <Typography variant="body2" color="error">
                  {errors.image}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '16px' }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default GalleryForm;

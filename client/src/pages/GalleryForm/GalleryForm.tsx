import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField, Button, Container, Typography } from '@mui/material';
import { GALERY_FORM_VALIDATION_SCHEMA } from '../../utils/validationSchema';
import { uploadGalley } from '../../api';
import { FormValues } from '../../interfaces';
import { connect } from 'react-redux';
import { AppDispatch } from '../../store';
import { uploadGalleryThunk } from '../../store/slices/thumbnailGallerySlice';

const initialValues: FormValues = {
  title: '',
  author: '',
  image: null,
};

const GalleryForm: React.FC<any> = ({ createGalleryImg }) => {
  const handleSubmit = async (
    values: FormValues,
    formikBag: FormikHelpers<FormValues>
  ) => {
    createGalleryImg(values);
    // try {
    //   const formData = new FormData();
    //   formData.append('title', values.title);
    //   formData.append('author', values.author);
    //   formData.append('image', values.image as File);

    //   const response = await uploadGalley(formData);
    //   console.log('Success:', response);
    //   console.log(formData, '<<formData');
    //   //formikBag.resetForm();
    // } catch (error) {
    //   console.error('Error during form submission:', error);
    // }
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

// Map state to props
// const mapStateToProps = (state: RootState) => ({
//   carouselData: state.carousel.carouselData,
//   isFetching: state.carousel.isFetching,
//   error: state.carousel.error,
// });

// Map dispatch to props
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  createGalleryImg: (values: any) => {
    console.log(values, 'values from component');
    return dispatch(uploadGalleryThunk(values));
  },
});

export default connect(null, mapDispatchToProps)(GalleryForm);

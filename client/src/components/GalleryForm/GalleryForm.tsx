import React from 'react';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField, Button, Container, Typography } from '@mui/material';
import { GALERY_FORM_VALIDATION_SCHEMA } from '../../utils/validationSchema';
import { uploadGalley } from '../../api';
import { FormValues } from '../../interfaces';
import { connect } from 'react-redux';
import { AppDispatch } from '../../store';
import { uploadGalleryThunk } from '../../store/slices/thumbnailGallerySlice';
import styles from './GalleryForm.module.scss';

const initialValues: FormValues = {
  title: '',
  author: '',
  image: null,
};

const GalleryForm: React.FC<any> = ({ createGalleryImg }) => {
  const handleSubmit = (
    values: FormValues,
    formikBag: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('image', values.image as File);
    createGalleryImg(formData);
    formikBag.resetForm();
  };
  return (
    <div>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Ensure the container takes up at least the full viewport height
        }}
      >
        <Typography variant="h4" gutterBottom className={styles.uploadImg}>
          <span>Upload Image</span>
          <ImageSearchIcon className={styles.imageSearchIcon} />
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
    //console.log(values, 'values from component');
    return dispatch(uploadGalleryThunk(values));
  },
});

export default connect(null, mapDispatchToProps)(GalleryForm);

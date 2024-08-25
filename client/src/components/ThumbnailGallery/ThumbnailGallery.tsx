import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { ImageData, GalleryProps } from '../../interfaces';
import { RootState, AppDispatch } from '../../store';
import { getThumbnailGalleryThunk } from '../../store/slices/thumbnailGallerySlice';
const url = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ThumbnailGallery: React.FC<GalleryProps> = ({
  galleryData,
  isFetching,
  error,
  getGalleryData,
}) => {
  useEffect(() => {
    if (galleryData.length === 0) {
      getGalleryData({ limit: 10, offset: 0 });
    }
  }, [galleryData, getGalleryData]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container sx={{ paddingTop: 4 }}>
      <ImageList sx={{ width: 1150 }} cols={4}>
        {/* {JSON.stringify(galleryData)} */}
        {galleryData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${url}${item.fileName}?w=248&fit=crop&auto=format`}
              srcSet={`${url}${item.fileName}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

// Map state to props
const mapStateToProps = (state: RootState) => ({
  galleryData: state.imgThumbnail.galleryData,
  isFetching: state.imgThumbnail.isFetching,
  error: state.imgThumbnail.error,
});

// Map dispatch to props
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getGalleryData: (params: { limit: number; offset: number }) =>
    dispatch(getThumbnailGalleryThunk(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGallery);

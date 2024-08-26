import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { ImageData, GalleryProps } from '../../interfaces';
import { RootState, AppDispatch } from '../../store';
import {
  getThumbnailGalleryThunk,
  deleteThumbnailGalleryItemThunk,
} from '../../store/slices/thumbnailGallerySlice';

//const url = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ThumbnailGallery: React.FC<GalleryProps> = ({
  galleryData,
  isFetching,
  error,
  getGalleryData,
  deleteItem,
}) => {
  useEffect(() => {
    getGalleryData({ limit: 20, offset: 0 });
  }, [getGalleryData]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log(`Edit image with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Delete image with ID: ${typeof id}`);
    deleteItem(id);
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      <ImageList sx={{ width: 1150 }} cols={4}>
        {galleryData.map((item, index) => (
          <ImageListItem
            key={item.id || index}
            sx={{
              position: 'relative',
              '&:hover .MuiImageListItemBar-root': {
                '& .actionButtons': {
                  opacity: 1,
                  visibility: 'visible',
                  cursor: 'pointer',
                },
              },
            }}
          >
            <img
              src={`${url}${item.fileName}?w=248&fit=crop&auto=format`}
              srcSet={`${url}${item.fileName}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <Box
                  className="actionButtons"
                  sx={{
                    display: 'flex',
                    gap: '8px',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'opacity 0.3s, visibility 0.3s',
                  }}
                >
                  <IconButton
                    aria-label={`edit ${item.title}`}
                    onClick={() => handleEdit(item.id)}
                    sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label={`delete ${item.title}`}
                    onClick={() => handleDelete(+item.id)}
                    sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              }
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
  deleteItem: (id: any) => dispatch(deleteThumbnailGalleryItemThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGallery);

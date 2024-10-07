import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { ImageData, GalleryProps } from '../../interfaces';
import { RootState, AppDispatch } from '../../store';
import {
  getThumbnailGalleryThunk,
  deleteThumbnailGalleryItemThunk,
  updateThumbnailGalleryItemThunk,
} from '../../store/slices/thumbnailGallerySlice';
import { URL } from '../../utils/constants';

//const url = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// const url =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5000'
//     : process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ThumbnailGallery: React.FC<GalleryProps> = ({
  galleryData,
  isFetching,
  error,
  getGalleryData,
  deleteItem,
  updateItem,
}) => {
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<ImageData>>({});

  useEffect(() => {
    getGalleryData({ limit: 20, offset: 0 });
  }, [getGalleryData]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleEdit = (item: ImageData) => {
    // Implement edit functionality
    console.log(`Edit image with ID: ${item.id}`);
    setEditMode(item.id);
    setEditData(item); // Pre-fill the form with the current item data
  };
  const handleCancelEdit = () => {
    setEditMode(null);
    setEditData({});
  };

  const handleSaveEdit = () => {
    if (editMode !== null) {
      updateItem(editMode, editData);
      setEditMode(null);
    }
  };

  const handleDelete = (id: number) => {
    //console.log(`Delete image with ID: ${typeof id}`);
    deleteItem(id);
  };

  return (
    // <Container sx={{ paddingTop: 4 }}>
    //   <ImageList sx={{ width: 1150 }} cols={4}>
    //     {galleryData.map((item, index) => (
    //       <ImageListItem
    //         key={item.id || index}
    //         sx={{
    //           position: 'relative',
    //           '&:hover .MuiImageListItemBar-root': {
    //             '& .actionButtons': {
    //               opacity: 1,
    //               visibility: 'visible',
    //               cursor: 'pointer',
    //             },
    //           },
    //         }}
    //       >
    //         <img
    //           src={`${url}${item.fileName}?w=248&fit=crop&auto=format`}
    //           srcSet={`${url}${item.fileName}?w=248&fit=crop&auto=format&dpr=2 2x`}
    //           alt={item.title}
    //           loading="lazy"
    //         />
    //         <ImageListItemBar
    //           title={item.title}
    //           subtitle={<span>by: {item.author}</span>}
    //           actionIcon={
    //             <Box
    //               className="actionButtons"
    //               sx={{
    //                 display: 'flex',
    //                 gap: '8px',
    //                 opacity: 0,
    //                 visibility: 'hidden',
    //                 transition: 'opacity 0.3s, visibility 0.3s',
    //               }}
    //             >
    //               <IconButton
    //                 aria-label={`edit ${item.title}`}
    //                 onClick={() => handleEdit(item)}
    //                 sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
    //               >
    //                 <Edit />
    //               </IconButton>
    //               <IconButton
    //                 aria-label={`delete ${item.title}`}
    //                 onClick={() => handleDelete(+item.id)}
    //                 sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
    //               >
    //                 <Delete />
    //               </IconButton>
    //             </Box>
    //           }
    //         />
    //       </ImageListItem>
    //     ))}
    //   </ImageList>
    // </Container>
    <Container sx={{ paddingTop: 4 }}>
      <ImageList sx={{ width: 1150 }} cols={4}>
        {galleryData.map((item, index) => (
          <Link
            key={item.id || index}
            to={`/gallery/${item.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            state={{ item }}
          >
            <ImageListItem
              key={item.id || index}
              sx={{
                position: 'relative',
                display: 'flex', // Ensure that the ImageListItem itself is a flex container
                flexDirection: 'column',
                '&:hover .MuiImageListItemBar-root': {
                  '& .actionButtons': {
                    opacity: 1,
                    visibility: 'visible',
                    cursor: 'pointer',
                  },
                },
              }}
            >
              {editMode === item.id ? (
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1, // Allow the Box to grow and fill the parent
                    p: 2,
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    label="Title"
                    value={editData.title || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Author"
                    value={editData.author || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, author: e.target.value })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Image URL"
                    value={editData.fileName || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, fileName: e.target.value })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveEdit}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button variant="outlined" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1, // Ensure this Box also fills the parent
                    p: 2,
                    justifyContent: 'space-between',
                  }}
                >
                  <img
                    src={`${URL}${item.fileName}?w=248&fit=crop&auto=format`}
                    srcSet={`${URL}${item.fileName}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    style={{ maxWidth: '100%', maxHeight: '100%' }} // Ensure the image does not overflow
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
                          onClick={() => handleEdit(item)}
                          sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label={`delete ${item.title}`}
                          onClick={() => handleDelete(item.id)}
                          sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                  />
                </Box>
              )}
            </ImageListItem>
          </Link>
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
  deleteItem: (id: number) => dispatch(deleteThumbnailGalleryItemThunk(id)),
  updateItem: (id: number, data: Partial<ImageData>) =>
    dispatch(updateThumbnailGalleryItemThunk({ id, data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGallery);

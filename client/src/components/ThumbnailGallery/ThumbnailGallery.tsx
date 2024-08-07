import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { ImageData } from '../../interfaces';
import { RootState, AppDispatch } from '../../store';
import { getThumbnailGalleryThunk } from '../../store/slices/thumbnailGallerySlice';

// const itemData: ImageData[] = [
//   {
//     id: 1,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 1',
//     author: 'author 1',
//   },
//   {
//     id: 2,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 2',
//     author: 'author 2',
//   },
//   {
//     id: 3,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 3',
//     author: 'author 3',
//   },
//   {
//     id: 4,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 5,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 6,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 7,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 8,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 9,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 10,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 11,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   },
//   {
//     id: 12,
//     img: 'https://via.placeholder.com/200',
//     title: 'Image 4',
//     author: 'author 4',
//   }
// ];

// Define component props



interface GalleryProps {
  galleryData: ImageData[];
  isFetching: boolean;
  error: string | null;
  getGalleryData: (params: { limit: number; offset: number }) => void;
}


const ThumbnailGallery: React.FC<GalleryProps> = ({ galleryData, isFetching, error, getGalleryData }) => {
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
        {galleryData.map((item) => (
            <ImageListItem key={item.id}>
            <img 
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
  galleryData: state.imgThumnail.galleryData,
  isFetching: state.imgThumnail.isFetching,
  error: state.imgThumnail.error,
});

// Map dispatch to props
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getGalleryData: (params: { limit: number; offset: number }) => dispatch(getThumbnailGalleryThunk(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGallery);



// // Map state to props
// const mapStateToProps = (state: RootState) => ({
//   carouselData: state.imgThumnail.carouselData,
//   isFetching: state.imgThumnail.isFetching,
//   error: state.carousel.error,
// });

// // Map dispatch to props
// const mapDispatchToProps = (dispatch: AppDispatch) => ({
//   getCarousel: (params: { limit: number; offset: number }) => dispatch(getCarouselThunk(params)),
// });

// // Connect the component to the Redux store
// export default connect(mapStateToProps, mapDispatchToProps)(Carousel);


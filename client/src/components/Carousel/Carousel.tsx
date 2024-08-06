import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.scss';
import { getCarouselData } from '../../api';
import { getCarouselThunk } from '../../store/slices/carouselSlice';
import { RootState, AppDispatch } from '../../store';



interface CarouselData {
  img: string;
  title: string;
  description: string;
}

// Define component props
interface CarouselProps {
  carouselData: CarouselData[];
  isFetching: boolean;
  error: string | null;
  getCarousel: (params: { limit: number; offset: number }) => void;
}

const defaultCarouselData: CarouselData[] = [
  {
    img: 'https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg',
    title: 'Kaui',
    description: 'dfdsfd hdjshf dshf jdkshf sdhfhsdf'
  },
  {
    img: 'https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg',
    title: 'Kaui',
    description: 'dfdsfd hdjshf dshf jdkshf sdhfhsdf'
  },
  {
    img: 'https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg',
    title: 'Kaui',
    description: 'dfdsfd hdjshf dshf jdkshf sdhfhsdf'
  }
]

const Carousel: React.FC<CarouselProps> = ({ carouselData, isFetching, error, getCarousel }) => {
  //const [carouselData, setCarouselData] = useState<CarouselData[]>(defaultCarouselData);
  useEffect(() => {
    if (carouselData.length === 0) {
      getCarousel({ limit: 10, offset: 0 });
    }
  }, [carouselData, getCarousel]);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  // https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getCarouselData(10, 0); // Example with limit 10 and offset 0
  //       // setCarouselData(response.data);
  //       setCarouselData(defaultCarouselData);
  //     } catch (error) {
  //       console.error('Error fetching data', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', paddingTop: 4 }}>
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <img
              src={item.img}
              alt={item.title}
              style={{ width: '100%', height: 'auto', marginBottom: 16 }}
            />
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body1" component="p">
              {item.description}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};


// Map state to props
const mapStateToProps = (state: RootState) => ({
  carouselData: state.carousel.carouselData,
  isFetching: state.carousel.isFetching,
  error: state.carousel.error,
});

// Map dispatch to props
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCarousel: (params: { limit: number; offset: number }) => dispatch(getCarouselThunk(params)),
});

// Connect the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.scss';


interface CarouselData {
  img: string;
  title: string;
  description: string;
}

const carouselData: CarouselData[] = [
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

const Carousel: React.FC = () => {

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg




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

export default Carousel;

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', paddingTop: 4 }}>
      <Slider {...settings}>
        <Box>
          <Typography variant="h4">Slide 1</Typography>
          <Typography>Content for Slide 1</Typography>
        </Box>
        <Box>
          <Typography variant="h4">Slide 2</Typography>
          <Typography>Content for Slide 2</Typography>
        </Box>
        <Box>
          <Typography variant="h4">Slide 3</Typography>
          <Typography>Content for Slide 3</Typography>
        </Box>
      </Slider>
    </Box>
  );
};

export default Carousel;

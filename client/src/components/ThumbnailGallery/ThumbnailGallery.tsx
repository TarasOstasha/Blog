import React from 'react';
import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';


interface ImageData {
    img: string;
    title: string;
    author: string;
  }

const itemData: ImageData[] = [
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 1',
    author: 'author 1',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 2',
    author: 'author 2',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 3',
    author: 'author 3',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  },
  {
    img: 'https://via.placeholder.com/200',
    title: 'Image 4',
    author: 'author 4',
  }
];

const ThumbnailGallery: React.FC = () => {
  return (
    <Container sx={{ paddingTop: 4 }}>
        <ImageList sx={{ width: 800 }} cols={4}>
        {itemData.map((item) => (
            <ImageListItem key={item.img}>
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

export default ThumbnailGallery;

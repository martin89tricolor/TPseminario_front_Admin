import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import {
  Container,
  Grid,
} from '@material-ui/core';

export default function AboutPhoto2() {
  return (
    <Container maxWidth="lg" >
      <Grid
            item
            lg={8}
            md={12}
            xl={12}
            xs={12}
          >
    <ImageList sx={{
        width: 600,
        height: 300,
        py: 0
      }}>
    {itemData.map((item) => (
      <ImageListItem key={item.img} >
        <img
          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>
  </Grid>
  </Container>
  );
}

const itemData = [
  {
    img: 'https://res.cloudinary.com/dntepcqvn/image/upload/v1636766657/MicrosoftTeams-image_mxknta.jpg',
    title: 'Manos',
  },
  {
    img: 'https://res.cloudinary.com/dntepcqvn/image/upload/v1636926028/image1_fdc8no.jpg',
    title: 'Camión',
  },
  
];

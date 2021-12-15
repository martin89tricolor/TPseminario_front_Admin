import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import {
  Container,
  Grid,
} from '@material-ui/core';

export default function AboutPhoto() {
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
    img: 'https://res.cloudinary.com/dntepcqvn/image/upload/v1639241564/100_7636_sn5lx4.jpg',
    title: 'Comedor',
  },
  {
    img:  'https://res.cloudinary.com/dntepcqvn/image/upload/v1639240317/Comedor-Escolar-Santa-Fe-El-Litoral._pmdluv.jpg',
    title: 'Chicos felices',
  },

  
];

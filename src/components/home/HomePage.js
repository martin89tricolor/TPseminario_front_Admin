import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import LatestProducts from 'src/components/home/LatestProducts';
import LatestEnlatados from 'src/components/home/LatestEnlatados';
import LatestEmbotellados from 'src/components/home/LatestEmbotellados';
import Banner from 'src/components/home/Banner'  
import Banner2 from 'src/components/home/Banner2'  
import Sparkle from 'src/components/Sparkle';
import VolunteerActivismIcon from '@material-ui/icons/VolunteerActivism';

const useStyles = makeStyles((theme) => ({
  volunteerButton: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
    width: '300px',
  },
}));

export default function Home ({productsdb, ...props}){
  const classes = useStyles();

  return (
    <React.Fragment>
    <Box
      sx={{
        minHeight: '100%',
        padding: '0px',
        py: 0
      }}
    >
      <main>
        <div>
          <Container maxWidth="xl" >
          <Grid
          container
          spacing={1}
        >
         <Grid
            item
            lg={8}
            md={12}
            xl={2.1}
            xs={12}
          >
            <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
          >
            <Sparkle color='white'>
            <Button
              variant="contained"
              color="primary"
              href="https://mpago.la/2EU1aHd"
              target="_blank"
              className={classes.volunteerButton}
              startIcon={<VolunteerActivismIcon />}
              >
              Doná $500
           </Button>
           </Sparkle>
           <Box
              sx={{
                py: 2
              }}
            >
            <Banner/>
            </Box>
            </Box>
            </Grid>
            <Grid
            item
            lg={8}
            md={12}
            xl={2.5}
            xs={12}
          >
       <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
          >
            <LatestProducts products={productsdb} />
            </Box>
            </Grid>   
            <Grid
            item
            lg={8}
            md={12}
            xl={2.5}
            xs={12}
          >
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
          >
            <LatestEnlatados products={productsdb} />
         </Box>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={2.5}
            xs={12}
          >
         <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
          >
            <LatestEmbotellados products={productsdb} />
        </Box>
          </Grid>
          <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            padding: '22px',
            py: 4
   
          }}
          >
            <Sparkle color='white'>
            <Button
              variant="contained"
              color="primary"
              href="https://mpago.la/2HbhfcS"
              target="_blank"
              className={classes.volunteerButton}
              startIcon={<VolunteerActivismIcon />}
              >
              Doná $1000
           </Button>
           </Sparkle>
           <Box
              sx={{
              
                py: 2
              }}
            >
            <Banner2/>
            </Box>
            </Box>
            </Grid>        
         </Container>
        </div>
      </main>
    </Box>
   </React.Fragment>
  );
}


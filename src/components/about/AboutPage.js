import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import Sparkle from 'src/components/Sparkle';
import Typography from '@material-ui/core/Typography';
import AboutPhoto from 'src/components/about/AboutPhoto' 
import AboutPhoto2 from 'src/components/about/AboutPhoto2'  
import VolunteerActivismIcon from '@material-ui/icons/VolunteerActivism';

const useStyles = makeStyles((theme) => ({
  volunteerButton: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
    width: '550px',
  },
}));

export default function AboutPage () {
  const classes = useStyles();

  return (
    <React.Fragment>
    <Box
      sx={{
      
        minHeight: '100%',
        py: 1
      }}
    >
      <main>
        <div>
          <Container maxWidth="lg" >
          <Box
      sx={{
      
        minHeight: '100%',
        py: 3
      }}
    >
    </Box>
    <Grid
          container
          spacing={5}
        >
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
             <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
             ¿Quienes somos?
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Somos una plataforma que realizamos, facilitamos y mejoramos la comunicación entre donadores de alimentos y comedores/ONG/fundaciones que necesiten ayuda.
            </Typography>
            <Box
              sx={{
              
                py: 2
              }}
            >
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
            Comedor/ONG/fundacion 
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Si formas parte de una organización social que brinda asistencia alimentaria, podes contactarte con nosotros a través del mail:  
            </Typography>
            <Typography variant="h4" align="center" color="#2619cf" paragraph>
            contacto@donapp.com.
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Podemos habilitarte una cuenta para que tengas acceso a este sitio web y puedas obtener donaciones de parte de distintos comercios. ¿Qué esperas para sumarte a DONNAP?
            </Typography>
            </Box>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
            Ayudanos con tu donación
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Si deseas contribuir con el mantenimiento de esta página web, que permite aprovechar al máximo los alimentos que se producen, ayudando a evitar la generación de residuos y el hambre en el país:
            </Typography>
            <Typography variant="h3" align="center" color="textPrimary" paragraph>
            Hace tu donación:
            </Typography>
            <Sparkle color='white'>
            <Button
              variant="contained"
              color="primary"
              href="https://mpago.la/2EU1aHd"
              target="_blank"
              className={classes.volunteerButton}
              startIcon={<VolunteerActivismIcon />}
              >
               $500
           </Button>
           </Sparkle>
           <Box sx={{ py: 1 }}>
           <Sparkle color='white'>
            <Button
              variant="contained"
              color="primary"
              href="https://mpago.la/2HbhfcS"
              target="_blank"
              className={classes.volunteerButton}
              startIcon={<VolunteerActivismIcon />}
              >
               $1000
           </Button>
           </Sparkle>
           </Box>
           </Grid>
           <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
             Misión
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Nuestro objetivo es facilitar y mejorar la comunicación entre donadores de alimentos y comedores/ONG/fundaciones, para permitir así, disminuir el desperdicio de alimentos en el país y ayudar a las personas que lamentablemente padecen hambre.
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Le ofrecemos a comerciantes de grandes, medianos y pequeños comercios y/o supermercados la posibilidad de publicar aquellos productos próximos a vencerse que no hayan sido vendidos hasta el momento, para que, a través de la entrega o retiro de los mismos, puedan ayudar a personas que realmente lo necesiten, y puedan obtener también alguna reducción de sus impuestos. 
            </Typography>
            <Box
              sx={{
              
                py: 2
              }}
            >
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
            Visión
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Vemos a toda la Argentina como un país que necesita de la solidaridad y el apoyo de todos sus habitantes, para ayudar a la gente que se encuentra en situación de calle, pobreza o desnutrición y para combatir la desigualdad social.
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Además, vemos como aquellos alimentos que se desperdician generan una gran cantidad de residuos.
            </Typography>
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
            Esto se traduce en un compromiso por abordar el problema de las ingentes pérdidas de alimentos en el mundo, como clave para reducir el hambre, la pobreza, el impacto ambiental y los efectos del cambio climático.
            </Typography>
            </Box>
            </Grid>
            <Grid
            item
            lg={4}
            md={12}
            xl={6}
            xs={12}
          >
           <AboutPhoto></AboutPhoto>
            </Grid>
           <Grid
            item
            lg={4}
            md={12}
            xl={6}
            xs={12}
          >
            <AboutPhoto2></AboutPhoto2>
          </Grid>
       </Grid>       
         </Container>
        </div>
      </main>
    </Box>
   </React.Fragment>
  );
}

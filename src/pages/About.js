import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AboutPage from 'src/components/about/AboutPage';
import image from "../img/landing-bg.jpg";

const About = ({...props}) => {

  return (
    <>
      <Helmet>
        <title>DONAPP | Nosotros</title>
      </Helmet>
      <Box
        sx={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: '100%',
          py: 0
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <AboutPage />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default About;

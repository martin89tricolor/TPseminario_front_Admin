import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import HomePage from 'src/components/home/HomePage';

const Home = ({...props}) => {

  return (
    <>
      <Helmet>
        <title>DONAPP | Home</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 0
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 1 }}>
            <HomePage />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;

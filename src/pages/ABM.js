import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ABMadmin from 'src/components/admin/ABMadmin';

const ABM = ({...props}) => {

  return (
    <>
      <Helmet>
        <title>DONAPP | ABM Publicaciones</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <ABMadmin />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ABM;

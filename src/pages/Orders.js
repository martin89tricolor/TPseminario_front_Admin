import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AdminOrders from 'src/components/admin/AdminOrders';

const Orders = ({...props}) => {

  return (
    <>
      <Helmet>
        <title>DONAPP | Listado de Donaciones</title>
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
            <AdminOrders />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Orders;

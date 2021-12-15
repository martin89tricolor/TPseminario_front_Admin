import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function OrdersRow (props){
  const { order, selected, checked, OnSelectOne } = props;
  const [open, setOpen] = useState(false);
  function handleSelect(e, id){
    OnSelectOne (e, id)
  }
  return (
     <>
    <TableRow
      hover
      key={order._id}
      selected={selected}
    >
      <TableCell padding="checkbox" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}> 
        <Checkbox
          checked={checked}
          onChange={(event) => handleSelect(event, order._id)}
          color= "primary"
          value="true"
        />
      </TableCell>
      <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        {order._id}
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        {`${order.buyOrder.user.comertialName}`}
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        {order.buyOrder.user.cuit}
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}> 
        {order.buyOrder.user.email}
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} align="center">
        {order.cantidad}
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        {order.fechadonacion}
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        {order.fechaentrega}
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        <Chip label={order.estado} color={order.estado === 'OK' ? 'primary' : 'default'} />
      </TableCell>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        <Chip label={order.estado2} color={order.estado2 === 'Enviado' ? 'primary' : 'default'} />
      </TableCell>
    </TableRow>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle de la Donación:
              </Typography>
              <Chip
                icon={<LocationOnIcon/>}
                label={`${'Av. Madero 1234'}, CP ${'1234'}, ${'Puerto Madero'}, ${'CABA'}.`}
                  />
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} align="left" >Producto</TableCell>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}align="center">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.buyOrder.products.map((producto) => (
                    <TableRow key={producto._id}>
                      <TableCell  component="th" scope="row">
                        {producto.product.nombre}
                      </TableCell>
                      <TableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}align="center">{producto.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
    )
}

const AdminOrders= ({ ...rest }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [limit] = useState(10);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    refreshPage(page);
  }, [page]);

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrders.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedOrders, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedOrders.slice(1));
    } else if (selectedIndex === selectedOrders.length - 1) {
      newSelected = newSelected.concat(selectedOrders.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedOrders.slice(0, selectedIndex),
        selectedOrders.slice(selectedIndex + 1)
      );
    }

    setSelectedOrders(newSelected);
  };

  function handlePageChange(value) {
    setPage(value);
  }

  const handleSelectAll = (event) => {
    let newSelected;

    if (event.target.checked) {
      newSelected = orders.map((producto) => producto._id);
    } else {
      newSelected = [];
    }

    setSelectedOrders(newSelected);
  };

  function handleClose() {
    setOpen(false);
  }

  function refreshPage(newPage) {
    axios.get('/orders/', {params: {page: newPage+1}})
    .then((res) => {
      setOrders(res.data.data.docs);
      setCount(res.data.data.total);
    });
  }
  function handleRemitos() {
    axios.post('/orders/update-status2', {ids: selectedOrders, estado2: 'Enviado'})
    .then((res) => {
      refreshPage(page);
      setSelectedOrders([]);
      setServerMessage(res.data.message);
      setOpen(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleEnviados() {
    axios.post('/orders/update-status', {ids: selectedOrders, estado: 'OK'})
    .then((res) => {
      refreshPage(page);
      setSelectedOrders([]);
      setServerMessage(res.data.message);
      setOpen(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 3,
        }}
      >
        <Button 
         onClick={handleRemitos} 
         sx={{ mx: 1 }}
          variant="contained"
              color="primary"
              href="  https://mega.nz/file/NM5WDAqB#YblXJnbek4R63ARbEC4pWyXOlchUcjrc-Igta45rUhQ"
              target="_blank"
          >
            Solicitar remitos
        </Button>
        <Button variant="contained" color="primary" onClick={handleEnviados} sx={{ mx: 1 }}>
          Marcar como entregadas
        </Button>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} padding="checkbox">
                    <Checkbox
                      checked={selectedOrders.length === orders.length}
                      color="primary"
                      indeterminate={
                        selectedOrders.length > 0
                        && selectedOrders.length < orders.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell >
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}> 
                    ID de Donación
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    Nombre ONG/Fundación
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    CUIT
                  </TableCell >
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    E-mail
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    Total de Productos
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    Fecha de Donación
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    Fecha límite de retiro
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    Estado de Entrega
                  </TableCell>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    Estado de Remito
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(0, limit).map((order) => (
                  <OrdersRow
                    key={order._id}
                    order={order}
                    selected={selectedOrders.indexOf(order._id) !== -1}
                    checked={selectedOrders.indexOf(order._id) !== -1}
                    OnSelectOne={(event, id) => handleSelectOne(event, id)}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          onPageChange={handlePageChange}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
          page={page}
          count={count}
        />
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity="success">
            {serverMessage}
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};

export default AdminOrders;

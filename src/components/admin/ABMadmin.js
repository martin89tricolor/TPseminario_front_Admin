import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Alert,
  Avatar,
  Box,
  Card,
  Checkbox,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import AdminListToolbar from 'src/components/admin/AdminListToolbar';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const ABMadmin = ({ ABMlist, onInsertProduct, onUpdateProduct, onDeleteProduct, ...rest }) => {
  const [selectedABMlistIds, setSelectedABMlistIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [productos, setProductos] = useState([]);
  const [open, setOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [buscadorText, setBuscadorText] = useState('');

  useEffect(() => {
    refreshPage(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSelectAll = (event) => {
    let newSelectedABMlistIds;

    if (event.target.checked) {
      newSelectedABMlistIds = productos.map((producto) => producto._id);
    } else {
      newSelectedABMlistIds = [];
    }

    setSelectedABMlistIds(newSelectedABMlistIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedABMlistIds.indexOf(id);
    let newSelectedABMlistIds = [];

    if (selectedIndex === -1) {
      newSelectedABMlistIds = newSelectedABMlistIds.concat(selectedABMlistIds, id);
    } else if (selectedIndex === 0) {
      newSelectedABMlistIds = newSelectedABMlistIds.concat(selectedABMlistIds.slice(1));
    } else if (selectedIndex === selectedABMlistIds.length - 1) {
      newSelectedABMlistIds = newSelectedABMlistIds.concat(selectedABMlistIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedABMlistIds = newSelectedABMlistIds.concat(
        selectedABMlistIds.slice(0, selectedIndex),
        selectedABMlistIds.slice(selectedIndex + 1)
      );
    }

    setSelectedABMlistIds(newSelectedABMlistIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function refreshPage(newPage) {
    axios.get('/products/', {
      params: {
        page: newPage+1,
        limit: 10,
        nombre: buscadorText === '' ? undefined : buscadorText,
      }})
    .then((res) => {
      setProductos(res.data.data.docs);
      setCount(res.data.data.total);
    });
  }

  function handleRemoveProduct() {
    axios.delete('/products/', {data: {ids: selectedABMlistIds}})
    .then((res) => {
      refreshPage(page);
      setSelectedABMlistIds([]);
      setServerMessage(res.data.message);
      setOpen(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleClose() {
    setOpen(false);
  }

  function handleBuscadorChange(texto) {
    setBuscadorText(texto);
  }

  function handleBuscar() {
    refreshPage(page);
  }

  return (
    <>
    <AdminListToolbar
      buscadorText={buscadorText}
      onBuscadorChange={handleBuscadorChange}
      onBuscar={handleBuscar}
      onDeleteClick={handleRemoveProduct}
    />
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedABMlistIds.length === productos.length}
                    color="primary"
                    indeterminate={
                      selectedABMlistIds.length > 0
                      && selectedABMlistIds.length < productos.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Producto
                </TableCell>
                <TableCell>
                  Categoría
                </TableCell>
                <TableCell>
                  Marca
                </TableCell>
                <TableCell>
                  Fecha de vencimiento
                </TableCell>
                <TableCell>
                  Zona
                </TableCell>
                <TableCell>
                  Volumen
                </TableCell>
                <TableCell>
                  Stock
                </TableCell>
                <TableCell>
                  Editar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.slice(0, limit).map((producto) => (
                <TableRow
                  hover
                  key={producto._id}
                  selected={selectedABMlistIds.indexOf(producto._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedABMlistIds.indexOf(producto._id) !== -1}
                      onChange={(event) => handleSelectOne(event, producto._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        // src={utils.productPath(producto.img)}
                        src={producto.img}
                        alt="Product"
                        variant="square"
                        sx={{
                          mr: 3,
                          height: 80,
                          width: 100
                        }}
                      >
                        <BrokenImageIcon />
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {producto.nombre}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {producto.categoria}
                  </TableCell>
                  <TableCell>
                    {producto.marca}
                  </TableCell>
                  <TableCell>
                    {producto.fecha}
                  </TableCell>
                  <TableCell>
                    {producto.zona}
                  </TableCell>
                  <TableCell>
                    {producto.volumen}
                  </TableCell>
                  <TableCell>
                    {producto.stock}
                  </TableCell>
                  <TableCell>
                    <IconButton component={RouterLink} to={`/admin/change-product/${producto._id}`} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
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

export default ABMadmin;

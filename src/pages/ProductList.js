import { Helmet } from 'react-helmet';
import {
  Autocomplete,
  Box,
  Paper,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  TextField,
} from '@material-ui/core';
import ProductCard from 'src/components/product//ProductCard';
import { Link as RouterLink } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const ProductList = (props) => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [waitingServer, setWaitingServer] = useState(true);
  const [zonas, setZonas] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [zona, setZona] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    axios.get('/products/', {params: {
      page: page,
      zona: zona === '' ? undefined : zona,
      marca: marca === '' ? undefined : marca,
      categoria: categoria === '' ? undefined : categoria,
      fecha: fecha === '' ? undefined : fecha,
    }})
    .then((res) => {
      setProducts(res.data.data.docs);
      setPages(res.data.data.pages);
      setWaitingServer(false);
    });
  }, [page, zona, marca, categoria, fecha]);

  useEffect(() => {
    axios.get('/products/filters')
    .then((res) => {
      setZonas(res.data.data.zonas);
      setCategorias(res.data.data.categorias);
      setMarcas(res.data.data.marcas);
      setFechas(res.data.data.fechas);
    });
  }, []);

  function handleAgregarClick(product) {
    props.onAgregarClick(product);
  }

  function handlePageChange(event, value) {
    setPage(value);
  }

  function handleCategoriaChange(e, value) {
    setCategoria(value);
    setPage(1);
  }

  function handleMarcaChange(e, value) {
    setMarca(value);
    setPage(1);
  }

  function handleZonaChange(e, value) {
    setZona(value);
    setPage(1);
  }

  function handleFechaChange(e, value) {
    setFecha(value);
    setPage(1);
  }

  if(waitingServer) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center'}}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>DONAPP | Catálogo de Productos</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 4
          
        }}
      >
        <Container maxWidth={false}>
          {/* <ProductListToolbar /> */}
          <Grid
            container
            maxWidth={true}
            spacing={2}
          >
            <Grid item xs={12} lg={3}>
              <Paper>
                <Autocomplete
                  disablePortal
                  id="combo-box-zona"
                  options={zonas}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Zona" />}
                  onChange={handleZonaChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Paper>
                <Autocomplete
                  disablePortal
                  id="combo-box-categorias"
                  options={categorias}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Categoría" />}
                  onChange={handleCategoriaChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Paper>
              <Autocomplete
                  disablePortal
                  id="combo-box-marcas"
                  options={marcas}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Marca" />}
                  onChange={handleMarcaChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Paper>
              <Autocomplete
                  disablePortal
                  id="combo-box-fechas"
                  options={fechas}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Fecha de Vencimiento" />}
                  onChange={handleFechaChange}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product._id}
                  lg={3}
                  md={6}
                  xs={12}
                >
                  {product.stock > 0 ?
                  <ProductCard
                    component={RouterLink}
                    to={'/app/product/' + product._id}
                    product={product}
                    onAgregarClick={handleAgregarClick}
                  /> :
                  <ProductCard
                    product={product}
                  />
                  }
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              page={page}
              count={pages}
              size="small"
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProductList;

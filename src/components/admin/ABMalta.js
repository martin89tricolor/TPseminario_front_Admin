import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ABMalta = ({...props}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    img: '',
  });
  const [mostrarImagenStatus, setMostrarImagenStatus] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [imagenOk, setImagenOk] = useState(true);
  const [imagenSubida, setImagenSubida] = useState('');

  const formik = useFormik({
    initialValues: {
      nombre: '',
      categoria: '',
      marca: '',
      fecha: 0,
      zona: '',
      volumen: '',
      stock: 0,
  
      descripcion: '',
    },
    validationSchema: Yup.object().shape({
      nombre: Yup.string().max(255).required('Campo requerido'),
      categoria: Yup.string().max(255).required('Campo requerido'),
      marca: Yup.string().max(255).required('Campo requerido'),
      fecha: Yup.string().max(255).required('Campo requerido'),
      zona: Yup.string().max(255).required('Campo requerido'),
      volumen: Yup.string().max(255).required('Campo requerido'),
      stock: Yup.number().integer("Tiene que ser un número entero").positive("Tiene que ser positivo").required("Campo requerido"),
      descripcion: Yup.string().max(255),
    }),
    onSubmit: (values) => {
      handleFormikSubmit(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  function handleFormikSubmit(newValues) {
    if (formik.isValid) {
      handleNewProduct({
        ...newValues,
        img: values.img,
      });
    }
  }

  function handleNewProduct(newProduct) {
    axios.post('/products/', newProduct)
    .then((res) => {
      navigate('/admin/ABM');
      alert(res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleFileChange(e) {
    setSubiendoImagen(true);
    setMostrarImagenStatus(true);
    const formData = new FormData()
    formData.append("files", e.target.files[0]);
    axios.post('/utils/upload', formData, {
      headers: {"Content-Type": "multipart/form-data"}
    })
    .then((res) => {
      setImagenOk(true);
      setImagenSubida(res.data.url);
      setValues({
        ...values,
        img: res.data.url,
      })
    })
    .catch((err) => {
      console.log(err);
      setImagenOk(false);
    })
    .finally(() => {
      setSubiendoImagen(false);
    });
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Card>
            <CardHeader
              subheader="Ingrese los datos para publicar un nuevo producto"
              title="Productos"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Elegir imagen
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {
                    mostrarImagenStatus ?
                    <Typography>
                      {subiendoImagen ? "Subiendo imagen..."
                        : imagenOk ? `La imagen ${imagenSubida} se subio correctamente!`
                          : "Error al subir imagen..."
                      }
                    </Typography>
                    : null
                  }
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    placeholder="Lata de Tomate Arcor"
                    error={Boolean(formik.touched.nombre && formik.errors.nombre)}
                    helperText={formik.touched.nombre && formik.errors.nombre}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Categoría"
                    name="categoria"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    placeholder="Enlatado"
                    error={Boolean(formik.touched.categoria && formik.errors.categoria)}
                    helperText={formik.touched.categoria && formik.errors.categoria}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Marca"
                    name="marca"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    placeholder="Arcor"
                    error={Boolean(formik.touched.marca && formik.errors.marca)}
                    helperText={formik.touched.marca && formik.errors.marca}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Fecha de vencimiento"
                    name="fecha"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    placeholder="10/10/2021"
                    error={Boolean(formik.touched.fecha && formik.errors.fecha)}
                    helperText={formik.touched.fecha && formik.errors.fecha}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Zona"
                    name="zona"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    placeholder="Lanús"
                    error={Boolean(formik.touched.zona && formik.errors.zona)}
                    helperText={formik.touched.zona && formik.errors.zona}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Volumen"
                    name="volumen"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    placeholder="300g"
                    error={Boolean(formik.touched.volumen && formik.errors.volumen)}
                    helperText={formik.touched.volumen && formik.errors.volumen}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Stock"
                    name="stock"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    type="number"
                    error={Boolean(formik.touched.stock && formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Descripción"
                    name="descripcion"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    multiline
                    rows={3}
                    error={Boolean(formik.touched.descripcion && formik.errors.descripcion)}
                    helperText={formik.touched.descripcion && formik.errors.descripcion}
                    onBlur={formik.handleBlur}
                  >
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button sx={{ mx: 70 }}
                color="primary"
                variant="contained"
                type="submit"
              >
                Guardar
              </Button>
            </Box>
          </Card>
        </form>
      </Container>
    </Box>
  );
};

export default ABMalta;

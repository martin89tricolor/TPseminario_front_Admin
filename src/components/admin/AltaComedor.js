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
} from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const AltaComedor = ({...props}) => {

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
  });

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="md">
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Card>
            <CardHeader
              subheader="Ingrese los datos para crear un nuevo usuario. No se olvide de chequear el CUIT."
              title="Alta de Comedor/Organización Social"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Nombre de Comedor/Organización Social"
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
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="CUIT"
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
                  md={4}
                  xs={12}
                >
             <Button style={{height: '100%'}}
              variant="contained"
              color="primary" 
              href="https://www.afip.gob.ar/genericos/exentas-rg2681/"
              target="_blank"
             >
               Chequear CUIT
              </Button>
                  </Grid>
                  <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Dirección"
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
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Localidad"
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
                  md={4}
                  xs={12}
                >
                 </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Provincia"
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
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Código Postal"
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
                  md={4}
                  xs={12}
                >
                 </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Teléfono"
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
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="descripcion"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    error={Boolean(formik.touched.descripcion && formik.errors.descripcion)}
                    helperText={formik.touched.descripcion && formik.errors.descripcion}
                    onBlur={formik.handleBlur}
                  >
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                    <TextField
                    fullWidth
                    label="Contraseña"
                    name="descripcion"
                    onChange={formik.handleChange}
                    required
                    variant="outlined"
                    error={Boolean(formik.touched.descripcion && formik.errors.descripcion)}
                    helperText={formik.touched.descripcion && formik.errors.descripcion}
                    onBlur={formik.handleBlur}
                  >
                  </TextField>
                 </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                
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
              <Button sx={{ mx: 60 }}
                color="primary"
                variant="contained"
                type="submit"
              >
                Crear
              </Button>
            </Box>
          </Card>
        </form>
      </Container>
    </Box>
  );
};

export default AltaComedor;

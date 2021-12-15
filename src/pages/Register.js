import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import image from "../img/landing-bg.jpg";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const Register = (props) => {
  const navigate = useNavigate();

  function handleSignUpButtonClick (values) {
    axios.post('/users/registration', values)
    .then(() => {
      alert("Usuario nuevo creado");
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Helmet>
        <title>DONAPP | Registro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: '100%',
          py: 0
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              comertialName: '',
              cuit:'',
              address1: '',
              city: '',
              province: '',
              phone: '',
              password: '',
              cp:'',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                comertialName: Yup.string().max(255).required('Ingrese nombre'),
                address1: Yup.string().max(255).required('Ingrese dirección'),
                cuit: Yup.string().max(255).required('Ingrese CUIT'),
                city: Yup.string().max(255).required('Ingrese localidad'),
                province: Yup.string().max(255).required('Ingrese provincia'),
                phone: Yup.string().max(255).required('Ingrese telefono'),
                cp: Yup.string().max(255).required('Ingrese Código Postal'),
                email: Yup.string().email('Ingresar un e-mail válido').max(255).required('Ingrese e-mail'),
                password: Yup.string().max(255).required('Ingrese contraseña'),
                policy: Yup.boolean().oneOf([true], 'Aceptar Terminos')
              })
            }
            onSubmit={(values) => {
              handleSignUpButtonClick(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1}}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Crear nueva cuenta
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Ingrese los datos para crear la cuenta
                  </Typography>
                </Box>
          <Grid
            container
            
          >
            <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                  error={Boolean(touched.comertialName && errors.comertialName)}
                  fullWidth
                  helperText={touched.comertialName && errors.comertialName}
                  label="Nombre del comercio"
                  margin="normal"
                  name="comertialName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comertialName}
                  variant="outlined"
                />
              </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                 <TextField
                  error={Boolean(touched.cuit && errors.cuit)}
                  fullWidth
                  helperText={touched.cuit && errors.cuit}
                  label="CUIT"
                  margin="normal"
                  name="cuit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cuit}
                  variant="outlined"
                />
              </Grid>
              </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                  error={Boolean(touched.address1 && errors.address1)}
                  fullWidth
                  helperText={touched.address1 && errors.address1}
                  label="Dirección"
                  margin="normal"
                  name="address1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address1}
                  variant="outlined"
                />
              </Grid>
             <Grid
              item
              md={6}
              xs={12}
            >
                 <TextField
                  error={Boolean(touched.city && errors.city)}
                  fullWidth
                  helperText={touched.city && errors.city}
                  label="Localidad"
                  margin="normal"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  variant="outlined"
                />
                </Grid>
                </Grid>
           <Grid
            container
            spacing={3}
          >
             <Grid
              item
              md={6}
              xs={12}
            >
                  <TextField
                  error={Boolean(touched.province && errors.province)}
                  fullWidth
                  helperText={touched.province && errors.province}
                  label=" Provincia"
                  margin="normal"
                  name="province"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.province}
                  variant="outlined"
                />
                </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                  <TextField
                  error={Boolean(touched.cp && errors.cp)}
                  fullWidth
                  helperText={touched.cp && errors.cp}
                  label="Código Postal"
                  margin="normal"
                  name="cp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cp}
                  variant="outlined"
                />
                </Grid>
                </Grid>
          <Grid
            container
            spacing={3}
          >
             <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Teléfono"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  variant="outlined"
                />
             </Grid>
             </Grid>
             </Grid>
                
           <Grid
            container
            spacing={3}
          >
             <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="E-mail"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                </Grid>
             <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                </Grid>
                </Grid>
      
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    He leido los
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terminos y Condiciones
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Registrarse
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Tiene una cuenta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Loguearse
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;

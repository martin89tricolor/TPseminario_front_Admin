import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import image from "../img/landing-bg.jpg";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';

const Login = (props) => {
  const [failedLogin, setFailedLogin] = useState(false);

  const handleLoginButtonClick = (values) => {
    setFailedLogin(false);
    axios.post('/users/login', {
      email: values.email,
      password: values.password,
    })
    .then((res) => {
      props.onSuccessfulLogin(res.data.loginUser.user, res.data.loginUser.token);
    })
    .catch((err) => {
      setFailedLogin(true);
      console.error(err);
    })
  }

  return (
    <>
      <Helmet>
        <title>DONAPP | Login</title>
      </Helmet>
      <Box
        sx={{
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
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Ingrese un e-mail válido').max(255).required('Debe ingresar e-mail'),
              password: Yup.string().max(255).required('Debe ingresar contraseña')
            })}
            onSubmit={(values) => {
              handleLoginButtonClick(values);
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
                <Box sx={{ mb: 3 }}>
                  </Box>
           <Container maxWidth="lg" >
                <Grid
                  item
                  lg={12}
                  md={12}
                  xl={4}
                  xs={12}
                >
            <ImageList sx={{
        width: 700,
        height: 150,
        py: 0
      }}>
    {itemData.map((item) => (
      <ImageListItem key={item.img} >
        <img
          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>    
      </Grid>
      </Container>
                <TextField
                  error={Boolean(touched.email && errors.email) || failedLogin}
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
                <TextField
                  error={Boolean(touched.password && errors.password) || failedLogin}
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color={"primary"}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Ingresar
                  </Button>
                </Box>
                {failedLogin
                ? (<Typography
                    color="red"
                    variant="body1"
                  >
                    Parece que algo salió mal 😔. ¿El usuario y contraseña son correctos?
                  </Typography>)
                : null}

                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  ¿No tenés cuenta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Registrate
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
const itemData = [
  {
    img: 'https://res.cloudinary.com/dntepcqvn/image/upload/v1639257680/1LOGO_w7zfr0.png',
    title: 'Logo',
  },
  

];


export default Login;

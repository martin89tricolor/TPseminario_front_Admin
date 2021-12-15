import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Container,
  Typography,
  TextField
} from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const AccountProfileDetails = ({onAccountDetailsSave, onUserChange, ...props}) => {

  const formik = useFormik({
    initialValues: {
      comertialName: props.user.comertialName,
      address1: props.user.address.address1,
      province: props.user.address.province,
      city: props.user.address.city,
      phone: props.user.address.phone,
    },
    validationSchema: Yup.object().shape({
      comertialName: Yup.string().max(255).matches(/^[A-Za-z ]*$/, 'El nombre solo puede contener letras y espacios').required('Campo requerido'),
      address1: Yup.string().max(255).required('Campo requerido'),
      province: Yup.string().max(255).required('Campo requerido'),
      city: Yup.string().max(255).required('Campo requerido'),
      phone: Yup.string().max(255).required('Campo requerido'),
    }),
    onSubmit: (values) => {
      handleFormikSubmit(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  function handleFormikSubmit(values) {
    if (formik.isValid) {
      const newUser = {
        ...props.user,
        comertialName: values.comertialName,
        address: {
          address1: values.address1,
          province: values.province,
          city: values.city,
          phone: values.phone,
        },
      };
      onAccountDetailsSave(newUser);
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
      noValidate
    >
       <Container maxWidth="lg">
            <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
             Datos del Comercio
            </Typography>
          </Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          ></Box>
        <Container maxWidth="lg">
            <Typography variant="h4" align="left" color="textPrimary" gutterBottom>
            Datos Personales
            </Typography>
      <Card>
        <CardHeader
          subheader="Puede modificar sus datos"
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
              <TextField
                fullWidth
                label="Nombre del Comercio"
                name="comertialName"
                onChange={formik.handleChange}
                required
                value={formik.values.comertialName}
                variant="outlined"
                error={Boolean(formik.touched.comertialName && formik.errors.comertialName)}
                helperText={formik.touched.comertialName && formik.errors.comertialName}
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
                label="Teléfono"
                name="phone"
                onChange={formik.handleChange}
                required
                value={formik.values.phone}
                variant="outlined"
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
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
                disabled
                label="E-mail"
                name="email"
                onChange={formik.handleChange}
                required
                value={props.user.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
     </Card>
     </Container>
     <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          ></Box>
     <Container maxWidth="lg">
            <Typography variant="h4" align="left" color="textPrimary" gutterBottom>
             Datos de Ubicación
            </Typography>
        <Card>
        <CardHeader
          subheader="Puede modificar sus datos de ubicación"
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
              <TextField
                fullWidth
                label="Dirección"
                name="address1"
                onChange={formik.handleChange}
                required
                value={formik.values.address1}
                variant="outlined"
                error={Boolean(formik.touched.adddress1 && formik.errors.address1)}
                helperText={formik.touched.address1 && formik.errors.address1}
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
                label="Localidad"
                name="city"
                onChange={formik.handleChange}
                required
                value={formik.values.city}
                variant="outlined"
                error={Boolean(formik.touched.city && formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
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
                label="Provincia"
                name="province"
                onChange={formik.handleChange}
                required
                value={formik.values.province}
                variant="outlined"
                error={Boolean(formik.touched.province && formik.errors.province)}
                helperText={formik.touched.province && formik.errors.province}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        </Card>
        </Container>
       
        <Container maxWidth="lg">
            
        <Card>
        <Divider />
        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Guardar Cambios
          </Button>
        </Box>
        </Card>
      </Container>
    </form>
  );
};

export default AccountProfileDetails;

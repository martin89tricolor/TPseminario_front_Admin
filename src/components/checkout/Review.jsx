import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ScrollToTop from 'src/ScrollToTop';
import Sparkle from 'src/components/Sparkle';
import Button from '@material-ui/core/Button';
import CheckIcon from "@material-ui/icons/Check";
import { Phone as PhoneIcon } from 'react-feather';
import { Mail as MailIcon } from 'react-feather';
var moment = require('moment');

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  payButton: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

export default function Review({values, products, onBuy, onStepBack, ...props}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ScrollToTop />
      <Typography variant="h4" gutterBottom>
        Su reserva ha sido confirmada.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Resumen de productos
      </Typography>
      <List disablePadding>
        {products.map((product, i) => (
          <ListItem className={classes.listItem} key={i}>
            <ListItemText
              primary={product.product.nombre}
              secondary={`${product.quantity} ${product.quantity === 1 ? "unidad" : "unidades"}`}
            />
            <Typography variant="body2">{product.quantity}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="h2" className={classes.total}>
            {products.map(p => p.quantity).reduce((a,b) => (a+b), 0)}
          </Typography>
        </ListItem>
      </List>
      <Typography variant="h5" color="#d32f2f" gutterBottom>
        Pongase en contacto con el donador, recuerde que tiene una fecha límite para retirar el/los productos.
      </Typography>
      <Typography variant="h5" gutterBottom> 
      Fecha límite para retirar  el/los productos:
      </Typography>
      <Typography gutterBottom>
      { moment().add(2, "days").format("DD/MM/YYYY")}
          </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Datos de contacto del donador:
          </Typography>
          <Typography gutterBottom>
          <PhoneIcon/>
          {' 4752-4234'}
          </Typography>
          <Typography gutterBottom>
          <MailIcon/>
          {' eltio@gmail.com'}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Sparkle color='random'>
            <Button
              variant="contained"
              color="primary"
              onClick={onBuy}
              className={classes.payButton}
              startIcon={<CheckIcon />}
            >
              Aceptar
            </Button>
          </Sparkle>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

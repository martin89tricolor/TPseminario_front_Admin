import React from 'react';
import {
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '20vh',
  },
  main: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  footer: {
    padding: theme.spacing(1, 1),
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth="lg">
        <Typography variant="h3" align="center"component="h1" gutterBottom>
        Copyright © DONAPP 2021.
        </Typography>
        <Typography variant="h5" align="center" component="h2" gutterBottom>
          {'Todos los derechos reservados.'}
        </Typography>
     </Container>
    </div>
  );
}

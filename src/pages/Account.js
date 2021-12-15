import { Helmet } from 'react-helmet';
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import axios from 'axios';
import {useEffect, useState} from 'react';

const Account = (props) => {

  const [user, setUser] = useState({});
  const [waitingServer, setWaitingServer] = useState(true);
  const [open, setOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    axios.get('/users/detail/')
    .then((res) => {
      setUser(res.data.data);
      setWaitingServer(false);
    });
  }, [props.user._id]);

  function handleUserChange(modifiedUser) {
    setUser(modifiedUser);
  }

  function handleAccountDetailsSave(newUser) {
    axios.put('/users/detail/', newUser)
    .then((res) => {
      setUser(res.data.data);
      setMessageType('success');
      setServerMessage('La información de la cuenta se actualizó correctamente.');
      setOpen(true);
    })
    .catch((err) => {
      setMessageType('error');
      setServerMessage('Ocurrió un error al actualizar la información de esta cuenta.');
      setOpen(true);
      console.error(err);
    });
  }

  function handleAvatarSave(avatarUrl) {
    axios.put('/users/detail/', {"_id": user._id, avatar: avatarUrl})
    .then((res) => {
      setUser(res.data.data);
      setMessageType('success');
      setServerMessage('La foto de perfil fue actualizada correctamente.');
      setOpen(true);
    })
    .catch((err) => {
      setMessageType('error');
      setServerMessage('Ocurrió un error al actualizar la foto de perfil.');
      console.error(err);
      setOpen(true);
    });
  }

  function handleClose() {
    setOpen(false);
  }

  if(waitingServer) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={waitingServer}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Helmet>
        <title>DONAPP | Datos de la cuenta</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile user={user} onAvatarChange={handleAvatarSave} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails
                user={user}
                onAccountDetailsSave={handleAccountDetailsSave}
                onUserChange={handleUserChange}
              />
            </Grid>
          </Grid>
        </Container>
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity={messageType}>
            {serverMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default Account;

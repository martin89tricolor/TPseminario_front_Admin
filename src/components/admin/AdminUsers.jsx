import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import axios from 'axios';

function AdminUsers ({ ABMlist, onInsertProduct, onUpdateProduct, onDeleteProduct, ...rest }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    refreshPage(page);
  }, [page]);

  const handleSelectAll = (event) => {
    let newSelected;

    if (event.target.checked) {
      newSelected = users.map((producto) => producto._id);
    } else {
      newSelected = [];
    }

    setSelectedUsers(newSelected);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelected);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function refreshPage(newPage) {
    axios.get('/users/', {params: {page: newPage+1}})
    .then((res) => {
      setUsers(res.data.data.docs);
      setCount(res.data.data.total);
    });
  }

  function handleDeleteUsers() {
    axios.delete('/users/', {data: {ids: selectedUsers}})
    .then((res) => {
      refreshPage(page);
      setSelectedUsers([]);
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

  return (
    <>
      <Helmet>
        <title>DONAPP | Users ABM</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 0
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                py: 3
              }}
            >
             <Button
              variant="contained"
              color="primary" 
              component={RouterLink} to={'/admin/add-user'}
             >
               Dar alta Comedor/Organización Social
              </Button>
              <Button variant="contained" color="primary" onClick={handleDeleteUsers} sx={{ mx: 1 }}>
                Eliminar seleccionados
              </Button>
            </Box>
            <Card {...rest}>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUsers.length === users.length}
                            color="primary"
                            indeterminate={
                              selectedUsers.length > 0
                              && selectedUsers.length < users.length
                            }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>
                          Nombre 
                        </TableCell>
                        <TableCell>
                          Email
                        </TableCell>
                        <TableCell>
                         Rol de usuario
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.slice(0, limit).map((user) => (
                        <TableRow
                          hover
                          key={user._id}
                          selected={selectedUsers.indexOf(user._id) !== -1}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUsers.indexOf(user._id) !== -1}
                              onChange={(event) => handleSelectOne(event, user._id)}
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
                                src={user.avatar}
                                alt="Product"
                                variant="rounded"
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
                                {user.comertialName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {user.email}
                          </TableCell>
                          <TableCell>
                            {user.isAdmin ?
                              <Chip label="Publicador/Donador" color="primary" /> :
                              <Chip label="Comedor/Organización Social" color="default" />
                            }
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
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AdminUsers;

import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  Home as HomeIcon,
  LogOut,
  LogIn,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  AlertCircle as AboutIcon,
  Edit3 as EditIcon,
  List as ListIcon,
} from 'react-feather';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/home',
    icon: HomeIcon,
    title: 'Home',
    requiresAdmin: false,
    requiresLogin: false,
  },

  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Publicaciones',
    requiresAdmin: false,
    requiresLogin: false,
  },
  {
    href: '/app/about',
    icon: AboutIcon,
    title: 'Nosotros',
    requiresAdmin: false,
    requiresLogin: false,
  },

  {
    href: '/app/misDonaciones',
    icon: SettingsIcon,
    title: 'Mis donaciones',
    requiresAdmin: false,
    requiresLogin: true,
  },

  {
    href: '/admin/ABM',
    icon: EditIcon,
    title: 'ABM',
    requiresAdmin: true,
    requiresLogin: true,
  },
  {
    href: '/admin/orders',
    icon: ListIcon,
    title: 'Donaciones',
    requiresAdmin: true,
    requiresLogin: true,
  },
  {
    href: '/admin/users',
    icon: ListIcon,
    title: 'Usuarios',
    requiresAdmin: true,
    requiresLogin: true,
  }
];

function visibleFor(link, user) {
  if(user.isGuest) {
    return !link.requiresLogin;
  }
  else {
    if(!user.isAdmin) {
      return !link.requiresAdmin;
    }
    else {
      return link.requiresAdmin;
    }
  }
}

const DashboardSidebar = ({ onMobileClose, openMobile, onLogOut, user, productCount }) => {
  const location = useLocation();

  function handleLogOutClick() {
    onLogOut();
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.comertialName || 'Visitante'}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.filter((item) => visibleFor(item, user)).map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {!user.isAdmin ?
            <NavItem
              href={'/app/cart-detail'}
              key={'Detalle del Carrito'}
              title={`Detalle del Carrito (${productCount})`}
              icon={ShoppingCart}
            />
            : null
          }
          {user.isGuest ?
            <NavItem
              href={'/login'}
              key={'Log in'}
              title={'Ingresar'}
              icon={LogIn}
            /> :
            <NavItem
              href={'#'}
              key={'Log out'}
              title={'Salir'}
              icon={LogOut}
              onClick={handleLogOutClick}
            />
          }
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>

  );

  return (
    <>
      {/* Si es un monitor, se esconde el Sidebar */}
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      {/* <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden> */}
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false,
};

export default DashboardSidebar;

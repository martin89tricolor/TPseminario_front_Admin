import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Footer from  'src/components/Footer';

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    // overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    // overflow: 'hidden',
    paddingTop: 64,
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  // overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  // overflow: 'scroll'
});

const DashboardLayout = (props) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  function handleLogOut() {
    props.onLogOut();
  }

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar
        products={props.products}
        user={props.user}
        onLogOut={handleLogOut}
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        user={props.user}
        onLogOut={handleLogOut}
        productCount={props.products.map(p => p.quantity).reduce((a,b) => (a+b), 0)}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
            <Footer></Footer>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;

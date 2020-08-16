import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { PageWrapper, MainContentWrapper } from './style';
import Toolbar from '../Toolbar';
import SideDrawer from '../SideDrawer';
import SideNav from '../SideNav';
import Footer from '../Footer';

const AuthLayout = ({ children }) => {
  const sideNavIsRendered = useSelector(
    (state) => state.layout.sideNavIsRendered
  );

  const renderSideNavigation = () => {
    if (sideNavIsRendered) {
      return <SideNav />;
    }
    return <SideDrawer />;
  };

  return (
    <>
      <Toolbar />
      <PageWrapper>
        {renderSideNavigation()}
        <MainContentWrapper>{children}</MainContentWrapper>
      </PageWrapper>
      <Footer />
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

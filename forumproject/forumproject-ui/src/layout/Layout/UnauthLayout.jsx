import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer';
import Footer from './Footer';

const UnauthLayout = ({ children }) => {
  return (
    <>
      <Toolbar />
      <SideDrawer />
      {children}
      <Footer />
    </>
  );
};

UnauthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnauthLayout;

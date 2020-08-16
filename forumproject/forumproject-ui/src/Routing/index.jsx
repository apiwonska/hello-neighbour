import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layout } from 'layout';
import history from './history';
import PrivateRoutes from './PrivateRoutes';
import RestrictedRoutes from './RestrictedRoutes';

const Routing = ({ authenticated }) => {
  return (
    <Router history={history}>
      <Layout>
        {authenticated ? <PrivateRoutes /> : <RestrictedRoutes />}
      </Layout>
    </Router>
  );
};

Routing.propTypes = {
  authenticated: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Routing);

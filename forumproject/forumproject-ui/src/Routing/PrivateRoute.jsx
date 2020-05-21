import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ authenticated, ...rest }) => {
  if (authenticated) {
    return <Route {...rest} />;
  }
  return <Redirect to="/" />;
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(PrivateRoute);

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RestrictedRoute = ({ authenticated, ...rest }) => {
  if (!authenticated) {
    return <Route {...rest} />;
  }
  return <Redirect to="/" />;
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(RestrictedRoute);

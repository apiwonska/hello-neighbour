import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from './history';
import Login from 'pages/auth/Login';
import Logout from 'pages/auth/Logout';
import Registration from 'pages/auth/Registration';
import PasswordReset from 'pages/auth/PasswordReset';
import PasswordResetConfirm from 'pages/auth/PasswordResetConfirm';
import Home from 'pages/Home';
import CategoryList from 'pages/CategoryList';
import ThreadList from 'pages/ThreadList';
import CreateThread from 'pages/CreateThread';
import Thread from 'pages/Thread';
import Profile from 'pages/Profile';
import EditProfile from 'pages/EditProfile';
import UserPosts from 'pages/UserPosts';
import PasswordChange from 'pages/PasswordChange';
import NotFound from 'pages/NotFound';

import { Header, Footer } from 'layout';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

const Routing = ({ authenticated }) => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact component={authenticated ? CategoryList : Home} />
        <RestrictedRoute path="/register" exact component={Registration} />
        <RestrictedRoute path="/auth" exact component={Login} />
        <RestrictedRoute path="/logout" exact component={Logout} />
        <RestrictedRoute
          path="/password-reset"
          exact
          component={PasswordReset}
        />
        <RestrictedRoute
          path="/password-reset/confirm"
          exact
          component={PasswordResetConfirm}
        />
        <PrivateRoute
          path="/categories/:categoryId"
          exact
          component={ThreadList}
        />
        <PrivateRoute
          path="/categories/:categoryId/threads/new"
          exact
          component={CreateThread}
        />
        <PrivateRoute
          path="/categories/:categoryId/threads/:threadId"
          exact
          component={Thread}
        />
        <PrivateRoute
          path="/profile/password-change"
          exact
          component={PasswordChange}
        />
        <PrivateRoute path="/profile/posts" exact component={UserPosts} />
        <PrivateRoute path="/profile/edit" exact component={EditProfile} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
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

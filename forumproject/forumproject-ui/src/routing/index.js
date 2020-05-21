import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from './history';
import Login from '../pages/auth/login';
import Logout from '../pages/auth/logout';
import Registration from '../pages/auth/registration';
import PasswordReset from '../pages/auth/passwordReset';
import PasswordResetConfirm from '../pages/auth/passwordResetConfirm';
import Home from '../pages/home';
import CategoryList from '../pages/categoryList';
import ThreadList from '../pages/threadList';
import CreateThread from '../pages/createThread';
import Thread from '../pages/thread';
import Profile from '../pages/profile';
import EditProfile from '../pages/editProfile';
import UserPosts from '../pages/userPosts';
import PasswordChange from '../pages/passwordChange';
import NotFound from '../pages/notFound';

import Header from '../components/header';
import Footer from '../components/footer';
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

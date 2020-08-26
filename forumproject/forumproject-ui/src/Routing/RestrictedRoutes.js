import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import LoginModal from 'pages/auth/LoginModal';
import RegistrationModal from 'pages/auth/RegistrationModal';
import PasswordResetModal from 'pages/auth/PasswordResetModal';
import PasswordResetConfirmModal from 'pages/auth/PasswordResetConfirmModal';
import AccessPage from 'pages/AccessPage';

const RestrictedRoutes = () => {
  return (
    <Route path="/">
      <Route path="/" component={AccessPage} />
      <Switch>
        <Route path="/register" exact component={RegistrationModal} />
        <Route path="/auth" exact component={LoginModal} />
        <Route path="/password-reset" exact component={PasswordResetModal} />
        <Route
          path="/password-reset/confirm"
          exact
          component={PasswordResetConfirmModal}
        />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Route>
  );
};

export default RestrictedRoutes;

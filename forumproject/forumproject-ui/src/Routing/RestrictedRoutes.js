import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from 'pages/auth/Login';
import Registration from 'pages/auth/Registration';
import PasswordReset from 'pages/auth/PasswordReset';
import PasswordResetConfirm from 'pages/auth/PasswordResetConfirm';
import AccessPage from 'pages/AccessPage';

const RestrictedRoutes = () => {
  return (
    <Route path="/">
      <Route path="/" component={AccessPage} />
      <Switch>
        <Route path="/register" exact component={Registration} />
        <Route path="/auth" exact component={Login} />
        <Route path="/password-reset" exact component={PasswordReset} />
        <Route
          path="/password-reset/confirm"
          exact
          component={PasswordResetConfirm}
        />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Route>
  );
};

export default RestrictedRoutes;

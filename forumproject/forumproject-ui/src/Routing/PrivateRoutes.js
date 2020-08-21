import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import ThreadListPage from 'pages/ThreadListPage';
import CreateThread from 'pages/CreateThread';
import ThreadPage from 'pages/ThreadPage';
import ProfilePage from 'pages/ProfilePage';
import EditProfile from 'pages/EditProfile';
import UserPostsPage from 'pages/UserPostsPage';
import PasswordChangePage from 'pages/PasswordChangePage';
import NotFound from 'pages/NotFound';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/categories" exact render={() => <Redirect to="/" />} />
      <Route path="/categories/:categoryId" exact component={ThreadListPage} />
      <Route
        path="/categories/:categoryId/threads/new"
        exact
        component={CreateThread}
      />
      <Route
        path="/categories/:categoryId/threads/:threadId"
        exact
        component={ThreadPage}
      />
      <Route
        path="/profile/password-change"
        exact
        component={PasswordChangePage}
      />
      <Route path="/profile/posts" exact component={UserPostsPage} />
      <Route path="/profile/edit" exact component={EditProfile} />
      <Route path="/profile/:userId" exact component={ProfilePage} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default PrivateRoutes;

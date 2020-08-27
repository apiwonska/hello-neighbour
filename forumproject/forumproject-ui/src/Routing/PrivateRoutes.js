import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import ThreadListPage from 'pages/ThreadListPage';
import CreateThreadPage from 'pages/CreateThreadPage';
import ThreadPage from 'pages/ThreadPage';
import ProfilePage from 'pages/ProfilePage';
import EditProfilePage from 'pages/EditProfilePage';
import UserPostsPage from 'pages/UserPostsPage';
import PasswordChangePage from 'pages/PasswordChangePage';
import { Error404 } from 'layout';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/categories" exact render={() => <Redirect to="/" />} />
      <Route path="/categories/:categoryId" exact component={ThreadListPage} />
      <Route
        path="/categories/:categoryId/threads/new"
        exact
        component={CreateThreadPage}
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
      <Route path="/profile/edit" exact component={EditProfilePage} />
      <Route path="/profile/:userId" exact component={ProfilePage} />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default PrivateRoutes;

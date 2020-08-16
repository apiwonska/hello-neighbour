import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from 'pages/Home';
import ThreadList from 'pages/ThreadList';
import CreateThread from 'pages/CreateThread';
import Thread from 'pages/Thread';
import Profile from 'pages/Profile';
import EditProfile from 'pages/EditProfile';
import UserPosts from 'pages/UserPosts';
import PasswordChange from 'pages/PasswordChange';
import NotFound from 'pages/NotFound';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/categories" exact render={() => <Redirect to="/" />} />
      <Route path="/categories/:categoryId" exact component={ThreadList} />
      <Route
        path="/categories/:categoryId/threads/new"
        exact
        component={CreateThread}
      />
      <Route
        path="/categories/:categoryId/threads/:threadId"
        exact
        component={Thread}
      />
      <Route path="/profile/password-change" exact component={PasswordChange} />
      <Route path="/profile/posts" exact component={UserPosts} />
      <Route path="/profile/edit" exact component={EditProfile} />
      <Route path="/profile/:userId" exact component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default PrivateRoutes;

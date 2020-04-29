import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/header';
import Footer from '../components/footer';
import Home from '../pages/home';
import LogIn from '../pages/login';
import CategoryList from '../pages/categoryList';
import Profile from '../pages/profile';
import Registration from '../pages/registration';
import Thread from '../pages/thread';
import ThreadList from '../pages/threadList';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

const Routing = (props) => {
  return (
    <BrowserRouter>
      <Header/>
      <Route path='/' exact component={ props.authenticated ? CategoryList : Home } />
      <RestrictedRoute path='/register' exact component={ Registration } />
      <RestrictedRoute path='/auth' exact component={ LogIn } />
      <PrivateRoute path='/categories/:categoryId' exact component={ ThreadList } />
      <PrivateRoute path='/categories/:categoryId/threads/:threadId' exact component={ Thread } />
      <PrivateRoute path='/profile/:userId' exact component={ Profile } />
      <Footer/>
    </BrowserRouter>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Routing);
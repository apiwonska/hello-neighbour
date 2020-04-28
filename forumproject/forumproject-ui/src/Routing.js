import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header';
import Footer from './components/footer';
import LandingPage from './pages/landingPage';
import LogIn from './pages/login';
import MainPage from './pages/mainPage';
import Profile from './pages/profile';
import Registration from './pages/registration';
import Thread from './pages/thread';
import ThreadsList from './pages/threadsList';

const Routing = (props) => {
  return (
    <BrowserRouter>
      <Header/>            
      <Route path='/' exact component={ props.authenticated ? MainPage : LandingPage } />
      <Route path='/register' exact component={ Registration } />
      <Route path='/auth' exact component={ LogIn } />
      <Route path='/categories/:categoryId' exact component={ ThreadsList } />
      <Route path='/categories/:categoryId/threads/:threadId' exact component={ Thread } />
      <Route path='/profile/:userId' exact component={ Profile } />
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
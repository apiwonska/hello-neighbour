import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header';
import Footer from './components/footer';
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import MainPage from './pages/mainPage';
import Profile from './pages/profile';
import Registration from './pages/registration';
import Thread from './pages/thread';
import ThreadsList from './pages/threadsList';

const Routing = (props) => {
  return (
    <BrowserRouter>
      <Header/>            
      <Route path='/' exact component={ props.isSignedIn ? MainPage : LandingPage } />
      <Route path='/register' exact component={ Registration } />
      <Route path='/auth' exact component={ Login } />
      <Route path='/category/:categoryId' exact component={ ThreadsList } />
      <Route path='/category/:categoryId/thread/:threadId' exact component={ Thread } />
      <Route path='/profile' exact component={ Profile } />
      <Footer/>
    </BrowserRouter>
  )
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.isSignedIn
  }
}

export default connect(mapStateToProps)(Routing);
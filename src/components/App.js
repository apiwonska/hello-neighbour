import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from '../layout/Layout';
import Header from './elements/Header';
import Footer from './elements/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Thread from './pages/Thread';
import ThreadsList from './pages/ThreadsList';

class App extends React.Component{
  render() {
    return (
      <div className="">
        <BrowserRouter>
          <Layout>
            <Header/>
            {/* <Route path='/' exact component={ LandingPage } /> */}
            <Route path='/' exact component={ MainPage } />
            <Route path='/register' exact component={ Registration } />
            <Route path='/auth' exact component={ Login } />
            <Route path='/category/:categoryId' exact component={ ThreadsList } />
            <Route path='/category/:categoryId/thread/:threadId' exact component={ Thread } />
            <Route path='/profile' exact component={ Profile } />
            <Footer/>
          </Layout>          
        </BrowserRouter>
      </div>      
    )
  }
}

export default App;
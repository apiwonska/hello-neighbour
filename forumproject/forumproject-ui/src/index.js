import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Layout from './layout/Layout';
import Routing from './Routing';

class App extends React.Component{
  render() {
    return (
      <Provider store={store}>        
        <Layout>
          <Routing/> 
        </Layout>
      </Provider>      
    )
  }
}

ReactDOM.render(  
    <App/>,
  document.getElementById('root')
);
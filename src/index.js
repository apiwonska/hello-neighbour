import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './redux/reducers';
import Layout from './layout/Layout';
import Routing from './Routing';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

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
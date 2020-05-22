import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import { Layout } from './layout';
import Routing from './Routing';

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Routing />
      </Layout>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'redux/store';
import Routing from 'Routing';

const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

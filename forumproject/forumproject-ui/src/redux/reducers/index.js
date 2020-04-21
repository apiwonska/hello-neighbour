import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import categoriesReducer from './categoriesReducer';
import categoryReducer from './categoryReducer';
import threadReducer from './threadReducer';

const reducers = combineReducers({
  isSignedIn: () => true,
  token: () => '3df1f99d17fac0685dd37ec04bf2b14a012de3d7',
  categories: categoriesReducer,
  category: categoryReducer,
  thread: threadReducer,
  form: formReducer,
});

export default reducers;
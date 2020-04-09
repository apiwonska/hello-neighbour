import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import categoriesReducer from './categoriesReducer';
import categoryReducer from './categoryReducer';
import threadReducer from './threadReducer';

const reducers = combineReducers({
  form: formReducer,  
  categories: categoriesReducer,
  category: categoryReducer,
  thread: threadReducer,
  isSignedIn: () => true,
});

export default reducers;
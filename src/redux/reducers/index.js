import { combineReducers } from 'redux';

import categoriesReducer from './categoriesReducer';
import categoryReducer from './categoryReducer';
import threadReducer from './threadReducer';

const reducers = combineReducers({
  isSignedIn: () => true,
  categories: categoriesReducer,
  category: categoryReducer,
  thread: threadReducer
});

export default reducers;
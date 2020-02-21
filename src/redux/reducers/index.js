import { combineReducers } from 'redux';

import categoriesReducer from './categoriesReducer';
import categoryReducer from './categoryReducer';

const reducers = combineReducers({
  isSignedIn: () => true,
  categories: categoriesReducer,
  category: categoryReducer
});

export default reducers;
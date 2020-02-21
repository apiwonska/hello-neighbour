import { combineReducers } from 'redux';

import categoryReducer from './categoryReducer';

const reducers = combineReducers({
  isSignedIn: () => true,
  categories: categoryReducer
});

export default reducers;
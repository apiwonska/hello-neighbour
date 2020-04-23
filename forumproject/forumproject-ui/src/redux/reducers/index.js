import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import categoriesReducer from './categoriesReducer';
import threadsByCategoryReducer from './threadsByCategoryReducer';
import threadReducer from './threadReducer';
import postsByThreadReducer from './postsByThreadReducer';


const reducers = combineReducers({
  isSignedIn: () => true,
  token: () => '3df1f99d17fac0685dd37ec04bf2b14a012de3d7',
  categories: categoriesReducer,
  threadsByCategory: threadsByCategoryReducer,
  thread: threadReducer,
  postsByThread: postsByThreadReducer,
  form: formReducer,
});

export default reducers;
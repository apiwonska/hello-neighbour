import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import categoriesReducer from './categoriesReducer';
import threadsByCategoryReducer from './threadsByCategoryReducer';
import threadReducer from './threadReducer';
import postsByThreadReducer from './postsByThreadReducer';
import userReducer from './userReducer';


const reducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  threadsByCategory: threadsByCategoryReducer,
  thread: threadReducer,
  postsByThread: postsByThreadReducer,
  user: userReducer,
  form: formReducer,
});

export default reducers;
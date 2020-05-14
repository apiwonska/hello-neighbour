import { combineReducers } from 'redux';

import authReducer from './authReducer';
import passwordResetReducer from './passwordResetReducer';
import categoriesReducer from './categoriesReducer';
import threadsByCategoryReducer from './threadsByCategoryReducer';
import threadReducer from './threadReducer';
import postsByThreadReducer from './postsByThreadReducer';
import userReducer from './userReducer';


const reducers = combineReducers({
  auth: authReducer,
  passwordReset: passwordResetReducer,
  categories: categoriesReducer,
  threadsByCategory: threadsByCategoryReducer,
  thread: threadReducer,
  postsByThread: postsByThreadReducer,
  user: userReducer
});

export default reducers;
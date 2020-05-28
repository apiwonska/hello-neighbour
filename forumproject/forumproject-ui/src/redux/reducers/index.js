import { combineReducers } from 'redux';

import authReducer from './authReducer';
import passwordResetReducer from './passwordResetReducer';
import categoriesReducer from './categoriesReducer';
import threadsByCategoryReducer from './threadsByCategoryReducer';
import threadReducer from './threadReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  auth: authReducer,
  passwordReset: passwordResetReducer,
  categories: categoriesReducer,
  threadsByCategory: threadsByCategoryReducer,
  thread: threadReducer,
  posts: postsReducer,
  user: userReducer,
});

export default reducers;

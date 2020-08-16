import { combineReducers } from 'redux';

import authReducer from './authReducer';
import passwordResetReducer from './passwordResetReducer';
import categoriesReducer from './categoriesReducer';
import threadListReducer from './threadListReducer';
import threadReducer from './threadReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import layoutReducer from './layoutReducer';

const reducers = combineReducers({
  auth: authReducer,
  passwordReset: passwordResetReducer,
  categories: categoriesReducer,
  threadList: threadListReducer,
  thread: threadReducer,
  posts: postsReducer,
  user: userReducer,
  layout: layoutReducer,
});

export default reducers;

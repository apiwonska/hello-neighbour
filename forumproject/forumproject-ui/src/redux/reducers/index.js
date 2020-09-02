import { combineReducers } from 'redux';

import authReducer from './authReducer';
import passwordResetReducer from './passwordResetReducer';
import categoriesReducer from './categoriesReducer';
import categoryReducer from './categoryReducer';
import threadListReducer from './threadListReducer';
import threadReducer from './threadReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import layoutReducer from './layoutReducer';
import modalReducer from './modalReducer';

const reducers = combineReducers({
  auth: authReducer,
  passwordReset: passwordResetReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  threadList: threadListReducer,
  thread: threadReducer,
  posts: postsReducer,
  user: userReducer,
  layout: layoutReducer,
  modal: modalReducer,
});

export default reducers;

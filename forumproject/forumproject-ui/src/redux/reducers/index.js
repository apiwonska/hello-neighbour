import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import categoriesReducer from './categoriesReducer';
import categoryThreadsReducer from './categoryThreadsReducer';
import threadPostsReducer from './threadPostsReducer';
import threadReducer from './threadReducer';


const reducers = combineReducers({
  isSignedIn: () => true,
  token: () => '3df1f99d17fac0685dd37ec04bf2b14a012de3d7',
  categories: categoriesReducer,
  categoryThreads: categoryThreadsReducer,
  thread: threadReducer,
  threadPosts: threadPostsReducer,
  form: formReducer,
});

export default reducers;
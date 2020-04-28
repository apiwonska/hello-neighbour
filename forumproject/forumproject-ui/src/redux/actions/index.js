import axios from 'axios';

import {
  REGISTER_USER_PENDING,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_ERRORS,
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_ERRORS,
  LOGOUT_USER,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_ERRORS,
  FETCH_THREADS_BY_CATEGORY_PENDING,
  FETCH_THREADS_BY_CATEGORY_FULFILLED,
  FETCH_THREADS_BY_CATEGORY_ERRORS,
  FETCH_THREAD_PENDING,
  FETCH_THREAD_FULFILLED,
  FETCH_THREAD_ERRORS,
  FETCH_POSTS_BY_THREAD_PENDING,
  FETCH_POSTS_BY_THREAD_FULFILLED,
  FETCH_POSTS_BY_THREAD_ERRORS,
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_ERRORS,  
  // CREATE_POST
} from './types';
import store from '../store';


// Create axios instance and set authentication header
const instance = () => {
  const instance = axios.create()
  const token = store.getState().auth.authenticated;
  const auth_header = token ? `Token ${token}` : '';
  instance.defaults.headers.common['Authorization'] = auth_header;
  return instance;
}

export const register = (formProps) => async dispatch => {
  dispatch({ type: REGISTER_USER_PENDING })
  try {
    const response = await axios.post(`/api/registration/`, formProps);
    dispatch({ type: REGISTER_USER_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: REGISTER_USER_ERRORS, payload: err.response.data })
  }
};

export const logIn = (formProps) => async dispatch => {
  dispatch({ type: LOGIN_USER_PENDING })
  try {
    const response = await axios.post(`/api/token-auth/`, formProps);
    dispatch({ type: LOGIN_USER_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: LOGIN_USER_ERRORS, payload: err.response.data })
  }
};

export const logOut = () => {
  return { type: LOGOUT_USER }
}

export const fetchCategories = () => async dispatch => {
  dispatch({ type: FETCH_CATEGORIES_PENDING })
  try {
    const response = await instance().get(`/api/categories`);
    dispatch({ type: FETCH_CATEGORIES_FULFILLED, payload: response.data })    
  } catch(err) {    
    dispatch({ type: FETCH_CATEGORIES_ERRORS, payload: err.response.data })
  }
};

export const fetchThreadsByCategory = (categoryId) => async dispatch => {
  dispatch({ type: FETCH_THREADS_BY_CATEGORY_PENDING })
  try {
    console.log('threads by category', instance().defaults.headers.common)
    const response = await instance().get(`/api/threads/?category=${categoryId}`);
    dispatch({ type: FETCH_THREADS_BY_CATEGORY_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: FETCH_THREADS_BY_CATEGORY_ERRORS, payload: err.response.data })
  }
};

export const fetchThread = (threadId) => async dispatch => {
  dispatch({ type: FETCH_THREAD_PENDING })
  try {
    const response = await instance().get(`/api/threads/${threadId}`);
    dispatch({ type: FETCH_THREAD_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: FETCH_THREAD_ERRORS, payload: err.response.data })
  }
};

export const fetchPostsByThread = (threadId) => async dispatch => {
  dispatch({ type: FETCH_POSTS_BY_THREAD_PENDING })
  try {
    const response = await instance().get(`/api/posts/?thread=${threadId}`);
    dispatch({ type: FETCH_POSTS_BY_THREAD_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: FETCH_POSTS_BY_THREAD_ERRORS, payload: err.response.data })
  }
};

export const fetchUser = (userId) => async dispatch => {
  dispatch({ type: FETCH_USER_PENDING });
  try {
    const response = await instance().get(`/api/users/${userId}`);
    dispatch({ type: FETCH_USER_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: FETCH_USER_ERRORS, payload: err.response.data })
  }
};

// export const createPost = (formValues, threadId, userId) => async dispatch => {
//   const created = new Date().toISOString();
//   console.log(formValues, threadId, userId, created)
//   const response = await instance.post(`/thread/${threadId}/posts`, {...formValues, userId, created});

//   dispatch ({
//     type: CREATE_POST,
//     payload: response.data
//   })
// }
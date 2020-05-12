import axios from 'axios';

import * as types from './types';
import store from '../store';
import history from '../../routing/history';

// Create axios instance and set authentication header
const instance = () => {
  const instance = axios.create()
  const token = store.getState().auth.authenticated;
  const auth_header = token ? `Token ${token}` : '';
  instance.defaults.headers.common['Authorization'] = auth_header;
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  return instance;
}

// AUTHENTICATION
export const register = (formProps) => async dispatch => {
  dispatch({ type: types.REGISTER_USER_PENDING })
  try {
    const response = await axios.post(`/api/registration/`, formProps);
    dispatch({ type: types.REGISTER_USER_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: types.REGISTER_USER_ERRORS, payload: err.response.data })
  }
};

export const logIn = (formProps) => async dispatch => {
  dispatch({ type: types.LOGIN_USER_PENDING })
  try {
    const response = await axios.post(`/api/token-auth/`, formProps);
    dispatch({ type: types.LOGIN_USER_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: types.LOGIN_USER_ERRORS, payload: err.response.data })
  }
};

export const logOut = () => {
  return { type: types.LOGOUT_USER }
}

export const resetPassword = (formProps) => async dispatch => {
  try {
    const response = await axios.post(`/api/password-reset/`, formProps);
    dispatch({ type: types.RESET_PASSWORD_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: types.RESET_PASSWORD_ERRORS, payload: err.response.data })
  }
}

export const confirmPasswordReset = (data) => async dispatch => {
  try {
    const response = await axios.post(`/api/password-reset/confirm/`, data);
    dispatch({ type: types.RESET_PASSWORD_CONFIRM_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: types.RESET_PASSWORD_CONFIRM_ERRORS, payload: err.response.data })
  }
}

// FORUM
// Categories
export const fetchCategories = () => async dispatch => {
  dispatch({ type: types.FETCH_CATEGORIES_PENDING })
  try {
    const response = await instance().get(`/api/categories`);
    dispatch({ type: types.FETCH_CATEGORIES_FULFILLED, payload: response.data })    
  } catch(err) {    
    dispatch({ type: types.FETCH_CATEGORIES_ERRORS, payload: err.response.data })
  }
};

// Threads
export const fetchThreadsByCategory = (categoryId) => async dispatch => {
  dispatch({ type: types.FETCH_THREADS_BY_CATEGORY_PENDING })
  try {
    const response = await instance().get(`/api/threads/?category=${categoryId}`);
    dispatch({ type: types.FETCH_THREADS_BY_CATEGORY_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: types.FETCH_THREADS_BY_CATEGORY_ERRORS, payload: err.response.data })
  }
};

export const fetchThread = (threadId) => async dispatch => {
  dispatch({ type: types.FETCH_THREAD_PENDING })
  try {
    const response = await instance().get(`/api/threads/${threadId}`);
    dispatch({ type: types.FETCH_THREAD_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: types.FETCH_THREAD_ERRORS, payload: err.response.data })
  }
};

export const createThread = (data) => async dispatch => {
  try {
    const response = await instance().post('/api/threads/', data);
    const { id, category } = response.data;
    history.push(`/categories/${category}/threads/${id}`);
    dispatch({ type: types.CREATE_THREAD_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: types.CREATE_THREAD_ERRORS, payload: err.response.data })
  }
};

// Posts
export const fetchPostsByThread = (threadId) => async dispatch => {
  dispatch({ type: types.FETCH_POSTS_BY_THREAD_PENDING })
  try {
    const response = await instance().get(`/api/posts/?thread=${threadId}`);
    dispatch({ type: types.FETCH_POSTS_BY_THREAD_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: types.FETCH_POSTS_BY_THREAD_ERRORS, payload: err.response.data })
  }
};

export const createPost = (data) => async dispatch => {
  try {
    const response = await instance().post('/api/posts/', data);
    dispatch({ type: types.CREATE_POST_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: types.CREATE_POST_ERRORS, payload: err.response.data })
  }
};

export const updatePost = (data, postId) => async dispatch => {
  try {
    const response = await instance().patch(`/api/posts/${postId}/`, data);
    dispatch({ type: types.UPDATE_POST_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: types.UPDATE_POST_ERRORS, payload: err.response.data })
  }
};

export const deletePost = (postId) => async dispatch => {
  try {
    await instance().delete(`/api/posts/${postId}/`);
    dispatch({ type: types.DELETE_POST_FULFILLED, payload: postId })
  } catch(err) {
    dispatch({ type: types.DELETE_POST_ERRORS, payload: err.response.data })
  }
};

// Users
export const fetchUser = (userId) => async dispatch => {
  dispatch({ type: types.FETCH_USER_PENDING });
  try {
    const response = await instance().get(`/api/users/${userId}`);
    dispatch({ type: types.FETCH_USER_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: types.FETCH_USER_ERRORS, payload: err.response.data })
  }
};

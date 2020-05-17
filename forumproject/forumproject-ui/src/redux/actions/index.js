import axios from 'axios';
import Cookies from 'universal-cookie';

import * as types from './types';
import history from '../../routing/history';
import forum from '../../apis/forum';


// Authentication cookies
const cookies = new Cookies();

const setCookie = async (name, value) => {
  const cookieExpirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  await cookies.set(name, value, {
    domain: 'localhost',
    path: '/',
    expires: cookieExpirationDate
  });
};

const setAuthCookies = async (data) => {
  const token = data['token'];
  let user = data['user'];
  // In case of password change we only get token in response
  // And we want to change expiration date in existing cookie
  if (!user) user = cookies.get('User');
  await setCookie('User', JSON.stringify(user));
  await setCookie('Authorization', token);
};

// AUTHENTICATION
export const register = (formProps) => async dispatch => {
  dispatch({
    type: types.REGISTER_USER_PENDING
  })
  try {
    const response = await axios.post(`/api/registration/`, formProps);
    await setAuthCookies(response.data);
    dispatch({
      type: types.REGISTER_USER_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.REGISTER_USER_ERRORS,
      payload: err.response.data
    })
  }
};

export const logIn = (formProps) => async dispatch => {
  dispatch({
    type: types.LOGIN_USER_PENDING
  })
  try {
    const response = await axios.post(`/api/token-auth/`, formProps);
    await setAuthCookies(response.data);
    dispatch({
      type: types.LOGIN_USER_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.LOGIN_USER_ERRORS,
      payload: err.response.data
    })
  }
};

export const logOut = () => async dispatch => {
  await cookies.remove('Authorization', {
    domain: 'localhost',
    path: '/'
  });
  await cookies.remove('User', {
    domain: 'localhost',
    path: '/'
  });
  dispatch({
    type: types.LOGOUT_USER
  })
}

export const resetPassword = (formProps) => async dispatch => {
  try {
    const response = await axios.post(`/api/password-reset/`, formProps);
    dispatch({
      type: types.RESET_PASSWORD_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.RESET_PASSWORD_ERRORS,
      payload: err.response.data
    })
  }
}

export const confirmPasswordReset = (data) => async dispatch => {
  try {
    const response = await axios.post(`/api/password-reset/confirm/`, data);
    dispatch({
      type: types.RESET_PASSWORD_CONFIRM_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.RESET_PASSWORD_CONFIRM_ERRORS,
      payload: err.response.data
    })
  }
}

export const changePassword = (data) => async dispatch => {
  dispatch({
    type: types.CHANGE_PASSWORD_PENDING
  })
  try {
    const response = await forum().patch(`/api/change-password/`, data);
    await setAuthCookies(response.data);
    dispatch({
      type: types.CHANGE_PASSWORD_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.CHANGE_PASSWORD_ERRORS,
      payload: err.response.data
    })
  }
}

// FORUM
// Categories
export const fetchCategories = () => async dispatch => {
  dispatch({
    type: types.FETCH_CATEGORIES_PENDING
  })
  try {
    const response = await forum().get(`/api/categories`);
    dispatch({
      type: types.FETCH_CATEGORIES_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_CATEGORIES_ERRORS,
      payload: err.response.data
    })
  }
};

// Threads
export const fetchThreadsByCategory = (categoryId) => async dispatch => {
  dispatch({
    type: types.FETCH_THREADS_BY_CATEGORY_PENDING
  })
  try {
    const response = await forum().get(`/api/threads/?category=${categoryId}`);
    dispatch({
      type: types.FETCH_THREADS_BY_CATEGORY_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_THREADS_BY_CATEGORY_ERRORS,
      payload: err.response.data
    })
  }
};

export const fetchThread = (threadId) => async dispatch => {
  dispatch({
    type: types.FETCH_THREAD_PENDING
  })
  try {
    const response = await forum().get(`/api/threads/${threadId}`);
    dispatch({
      type: types.FETCH_THREAD_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_THREAD_ERRORS,
      payload: err.response.data
    })
  }
};

export const createThread = (data) => async dispatch => {
  try {
    const response = await forum().post('/api/threads/', data);
    const {
      id,
      category
    } = response.data;
    history.push(`/categories/${category}/threads/${id}`);
    dispatch({
      type: types.CREATE_THREAD_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.CREATE_THREAD_ERRORS,
      payload: err.response.data
    })
  }
};

// Posts
export const fetchPostsByThread = (threadId) => async dispatch => {
  dispatch({
    type: types.FETCH_POSTS_BY_THREAD_PENDING
  })
  try {
    const response = await forum().get(`/api/posts/?thread=${threadId}`);
    dispatch({
      type: types.FETCH_POSTS_BY_THREAD_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_POSTS_BY_THREAD_ERRORS,
      payload: err.response.data
    })
  }
};

export const fetchPostsByUser = (userId) => async dispatch => {
  dispatch({
    type: types.FETCH_POSTS_BY_USER_PENDING
  })
  try {
    const response = await forum().get(`/api/posts/?user=${userId}`);
    dispatch({
      type: types.FETCH_POSTS_BY_USER_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_POSTS_BY_USER_ERRORS,
      payload: err.response.data
    })
  }
};

export const createPost = (data) => async dispatch => {
  try {
    const response = await forum().post('/api/posts/', data);
    dispatch({
      type: types.CREATE_POST_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.CREATE_POST_ERRORS,
      payload: err.response.data
    })
  }
};

export const updatePost = (data, postId) => async dispatch => {
  try {
    const response = await forum().patch(`/api/posts/${postId}/`, data);
    dispatch({
      type: types.UPDATE_POST_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.UPDATE_POST_ERRORS,
      payload: err.response.data
    })
  }
};

export const deletePost = (postId) => async dispatch => {
  try {
    await forum().delete(`/api/posts/${postId}/`);
    dispatch({
      type: types.DELETE_POST_FULFILLED,
      payload: postId
    })
  } catch (err) {
    dispatch({
      type: types.DELETE_POST_ERRORS,
      payload: err.response.data
    })
  }
};

// Users
export const fetchUser = (userId) => async dispatch => {
  dispatch({
    type: types.FETCH_USER_PENDING
  });
  try {
    const response = await forum().get(`/api/users/${userId}`);
    dispatch({
      type: types.FETCH_USER_FULFILLED,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: types.FETCH_USER_ERRORS,
      payload: err.response.data
    })
  }
};
import forum from 'apis/forum';
import {
  FETCH_POSTS_BY_THREAD_PENDING,
  FETCH_POSTS_BY_THREAD_FULFILLED,
  FETCH_POSTS_BY_THREAD_ERRORS,
  FETCH_POSTS_BY_USER_PENDING,
  FETCH_POSTS_BY_USER_ERRORS,
  FETCH_POSTS_BY_USER_FULFILLED,
  CREATE_POST_FULFILLED,
  CREATE_POST_ERRORS,
  UPDATE_POST_FULFILLED,
  UPDATE_POST_ERRORS,
  DELETE_POST_FULFILLED,
  DELETE_POST_ERRORS,
} from './types';

export const fetchPostsByThread = (
  threadId,
  itemsPerPage,
  offset = 0
) => async (dispatch) => {
  dispatch({
    type: FETCH_POSTS_BY_THREAD_PENDING,
  });
  try {
    const response = await forum().get(
      `/api/posts/?thread=${threadId}&limit=${itemsPerPage}&offset=${offset}`
    );
    dispatch({
      type: FETCH_POSTS_BY_THREAD_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_POSTS_BY_THREAD_ERRORS,
      payload: err.response,
    });
  }
};

export const fetchPostsByUser = (userId, itemsPerPage, offset = 0) => async (
  dispatch
) => {
  dispatch({
    type: FETCH_POSTS_BY_USER_PENDING,
  });
  try {
    const response = await forum().get(
      `/api/posts/?user=${userId}&ordering=-created&limit=${itemsPerPage}&offset=${offset}`
    );
    dispatch({
      type: FETCH_POSTS_BY_USER_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_POSTS_BY_USER_ERRORS,
      payload: err.response,
    });
  }
};

export const createPost = (data) => async (dispatch) => {
  try {
    const response = await forum().post('/api/posts/', data);
    dispatch({
      type: CREATE_POST_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_POST_ERRORS,
      payload: err.response,
    });
  }
};

export const updatePost = (data, postId) => async (dispatch) => {
  try {
    const response = await forum().patch(`/api/posts/${postId}/`, data);
    dispatch({
      type: UPDATE_POST_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_POST_ERRORS,
      payload: err.response,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await forum().delete(`/api/posts/${postId}/`);
    dispatch({
      type: DELETE_POST_FULFILLED,
      payload: postId,
    });
  } catch (err) {
    dispatch({
      type: DELETE_POST_ERRORS,
      payload: err.response,
    });
  }
};

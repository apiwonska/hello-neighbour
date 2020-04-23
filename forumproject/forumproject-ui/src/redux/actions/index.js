import forum from '../../apis/forum';

import {
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
  // CREATE_POST
} from './types';

export const fetchCategories = () => async dispatch => {
  dispatch({ type: FETCH_CATEGORIES_PENDING })
  try {
    const response = await forum.get(`http://localhost:8000/api/categories`);
    dispatch({ type: FETCH_CATEGORIES_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: FETCH_CATEGORIES_ERRORS, payload: err })
  }
}

export const fetchThreadsByCategory = (categoryId) => async dispatch => {
  dispatch({ type: FETCH_THREADS_BY_CATEGORY_PENDING })
  try {
    const response = await forum.get(`http://localhost:8000/api/threads/?category=${categoryId}`);
    dispatch({ type: FETCH_THREADS_BY_CATEGORY_FULFILLED, payload: response.data })
  } catch(err) {
    dispatch({ type: FETCH_THREADS_BY_CATEGORY_ERRORS, payload: err })
  }
}

export const fetchThread = (threadId) => async dispatch => {
  dispatch({ type: FETCH_THREAD_PENDING })
  try {
    const response = await forum.get(`http://localhost:8000/api/threads/${threadId}`);
    dispatch({ type: FETCH_THREAD_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: FETCH_THREAD_ERRORS, payload: err })
  }
}

export const fetchPostsByThread = (threadId) => async dispatch => {
  dispatch({ type: FETCH_POSTS_BY_THREAD_PENDING })
  try {
    const response = await forum.get(`http://localhost:8000/api/posts/?thread=${threadId}`);
    dispatch({ type: FETCH_POSTS_BY_THREAD_FULFILLED, payload: response.data })    
  } catch(err) {
    dispatch({ type: FETCH_POSTS_BY_THREAD_ERRORS, payload: err })
  }
}

// export const createPost = (formValues, threadId, userId) => async dispatch => {
//   const created = new Date().toISOString();
//   console.log(formValues, threadId, userId, created)
//   const response = await forum.post(`/thread/${threadId}/posts`, {...formValues, userId, created});

//   dispatch ({
//     type: CREATE_POST,
//     payload: response.data
//   })
// }
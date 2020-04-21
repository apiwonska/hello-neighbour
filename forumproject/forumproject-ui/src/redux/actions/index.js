import forum from '../../apis/forum';
// import forum1 from '../../apis/forum1';

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORY_THREADS,
  FETCH_THREAD,
  FETCH_THREAD_POSTS,
  // CREATE_POST
} from './types';

export const fetchCategories = () => async dispatch => {
  const response = await forum.get('http://localhost:8000/api/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: response.data})
}

export const fetchCategoryThreads = (categoryId) => async dispatch => {
  const response = await forum.get(`http://localhost:8000/api/threads/?category=${categoryId}`);

  dispatch({ type: FETCH_CATEGORY_THREADS, payload: response.data})
}

export const fetchThread = (threadId) => async dispatch => {
  // const response = await forum1.get(`/threads/${threadId}`);
  const response = await forum.get(`http://localhost:8000/api/threads/${threadId}`);

  dispatch({ type: FETCH_THREAD, payload: response.data })
}

export const fetchThreadPosts = (threadId) => async dispatch => {
  const response = await forum.get(`http://localhost:8000/api/posts/?thread=${threadId}`);

  dispatch({ type: FETCH_THREAD_POSTS, payload: response.data })
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
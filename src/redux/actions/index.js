import forum from '../../apis/forum';

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  FETCH_THREAD,
  // CREATE_POST
} from './types';

export const fetchCategories = () => async dispatch => {
  const response = await forum.get('/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: response.data})
}

export const fetchCategory = (categoryId) => async dispatch => {
  const response = await forum.get(`/categories/${categoryId}`);

  dispatch({ type: FETCH_CATEGORY, payload: response.data})
}

export const fetchThread = (threadId) => async dispatch => {
  const response = await forum.get(`/threads/${threadId}`);

  dispatch({
    type: FETCH_THREAD,
    payload: response.data
  })
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
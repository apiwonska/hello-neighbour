import forum from '../../apis/forum';

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  FETCH_THREAD
} from './types';

export const fetchCategories = () => async dispatch => {
  const response = await forum.get('/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: response.data})
}

export const fetchCategory = (id) => async dispatch => {
  const response = await forum.get(`/categories/${id}`);

  dispatch({ type: FETCH_CATEGORY, payload: response.data})
}

export const fetchThread = (id) => async dispatch => {
  const response = await forum.get(`/threads/${id}`);

  dispatch({
    type: FETCH_THREAD,
    payload: response.data
  })
}
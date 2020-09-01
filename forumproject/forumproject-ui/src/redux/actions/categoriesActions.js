import forum from 'apis/forum';
import {
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_ERRORS,
} from './types';

const fetchCategories = () => async (dispatch) => {
  dispatch({
    type: FETCH_CATEGORIES_PENDING,
  });
  try {
    const response = await forum().get(`/api/categories`);
    dispatch({
      type: FETCH_CATEGORIES_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_CATEGORIES_ERRORS,
      payload: err.response,
    });
  }
};

export default fetchCategories;

import forum from '../../apis/forum';

import {
  FETCH_CATEGORIES
} from './types';

export const fetchCategories = () => async dispatch => {
  const response = await forum.get('/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: response.data})
}
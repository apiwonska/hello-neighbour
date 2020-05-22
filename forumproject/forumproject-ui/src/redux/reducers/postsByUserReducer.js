import _ from 'lodash';

import {
  FETCH_POSTS_BY_USER_PENDING,
  FETCH_POSTS_BY_USER_FULFILLED,
  FETCH_POSTS_BY_USER_ERRORS,
  DELETE_POST_FULFILLED,
  UPDATE_POST_FULFILLED,
} from '../actions/types';

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: {},
  errors: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  let count;
  let results;
  let data;
  let index;
  switch (action.type) {
    case FETCH_POSTS_BY_USER_PENDING:
      return { ...INITIAL_STATE, fetching: true };

    case FETCH_POSTS_BY_USER_FULFILLED:
      return { ...INITIAL_STATE, fetched: true, data: action.payload };

    case FETCH_POSTS_BY_USER_ERRORS:
      return { ...INITIAL_STATE, errors: action.payload };

    case DELETE_POST_FULFILLED:
      count = state.data.count - 1;
      results = [...state.data.results];
      _.remove(results, { id: action.payload });
      data = { ...state.data, count, results };
      return { ...state, data, errors: null };

    case UPDATE_POST_FULFILLED:
      results = [...state.data.results];
      index = results.findIndex((el) => el.id === action.payload.id);
      results.splice(index, 1, action.payload);
      data = { ...state.data, results };
      return { ...state, data, errors: null };

    default:
      return state;
  }
};

export default reducer;

import {
  FETCH_POSTS_BY_THREAD_PENDING,
  FETCH_POSTS_BY_THREAD_FULFILLED,
  FETCH_POSTS_BY_THREAD_ERRORS,
  FETCH_POSTS_BY_USER_PENDING,
  FETCH_POSTS_BY_USER_FULFILLED,
  FETCH_POSTS_BY_USER_ERRORS,
  CREATE_POST_FULFILLED,
  UPDATE_POST_FULFILLED,
  DELETE_POST_FULFILLED,
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
    // fetch posts by thread
    case FETCH_POSTS_BY_THREAD_PENDING:
      return { ...INITIAL_STATE, fetching: true };

    case FETCH_POSTS_BY_THREAD_FULFILLED:
      return { ...INITIAL_STATE, fetched: true, data: action.payload };

    case FETCH_POSTS_BY_THREAD_ERRORS:
      return { ...INITIAL_STATE, errors: action.payload };

    // fetch posts by user
    case FETCH_POSTS_BY_USER_PENDING:
      return { ...INITIAL_STATE, fetching: true };

    case FETCH_POSTS_BY_USER_FULFILLED:
      return { ...INITIAL_STATE, fetched: true, data: action.payload };

    case FETCH_POSTS_BY_USER_ERRORS:
      return { ...INITIAL_STATE, errors: action.payload };

    case CREATE_POST_FULFILLED:
      count = state.data.count + 1;
      results = [...state.data.results, action.payload];
      data = { ...state.data, count, results };
      return { ...state, data, errors: {} };

    case UPDATE_POST_FULFILLED:
      results = [...state.data.results];
      index = results.findIndex((el) => el.id === action.payload.id);
      results.splice(index, 1, action.payload);
      data = { ...state.data, results };
      return { ...state, data, errors: {} };

    case DELETE_POST_FULFILLED:
      count = state.data.count - 1;
      data = { ...state.data, count };
      return { ...state, data, errors: {} };

    default:
      return state;
  }
};

export default reducer;

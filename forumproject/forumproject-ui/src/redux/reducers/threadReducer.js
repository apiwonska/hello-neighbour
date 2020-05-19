import {
  FETCH_THREAD_PENDING,
  FETCH_THREAD_FULFILLED,
  FETCH_THREAD_ERRORS,
} from '../actions/types';

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: {},
  errors: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_THREAD_PENDING:
      return { ...INITIAL_STATE, fetching: true };
    case FETCH_THREAD_FULFILLED:
      return { ...INITIAL_STATE, fetched: true, data: action.payload };
    case FETCH_THREAD_ERRORS:
      return { ...INITIAL_STATE, errors: action.payload };
    default:
      return state;
  }
};

export default reducer;

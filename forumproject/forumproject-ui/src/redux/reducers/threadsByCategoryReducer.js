import {
  FETCH_THREADS_BY_CATEGORY_PENDING,
  FETCH_THREADS_BY_CATEGORY_FULFILLED,
  FETCH_THREADS_BY_CATEGORY_ERRORS,
} from '../actions/types';


const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: [],
  errors: null,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_THREADS_BY_CATEGORY_PENDING:
      return {...INITIAL_STATE, fetching: true};
    case FETCH_THREADS_BY_CATEGORY_FULFILLED:
      return {...INITIAL_STATE, fetched: true, data: action.payload};
    case FETCH_THREADS_BY_CATEGORY_ERRORS:
      return {...INITIAL_STATE, errors: action.payload};
    default:
      return state;
  }
}

export default reducer;
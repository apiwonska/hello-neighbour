import {
  FETCH_THREADS_BY_CATEGORY_PENDING,
  FETCH_THREADS_BY_CATEGORY_FULFILLED,
  FETCH_THREADS_BY_CATEGORY_ERRORS,
} from '../actions/types';


const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  errors: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREADS_BY_CATEGORY_PENDING:
      return {...initialState, fetching: true};
    case FETCH_THREADS_BY_CATEGORY_FULFILLED:
      return {...initialState, fetched: true, data: action.payload};
    case FETCH_THREADS_BY_CATEGORY_ERRORS:
      return {...initialState, errors: action.payload};
    default:
      return state;
  }
}

export default reducer;
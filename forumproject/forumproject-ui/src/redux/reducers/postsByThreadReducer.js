import {
  FETCH_POSTS_BY_THREAD_PENDING,
  FETCH_POSTS_BY_THREAD_FULFILLED,
  FETCH_POSTS_BY_THREAD_ERRORS,
} from '../actions/types';


const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  errors: null,
}

const reducer = (state=initialState, action) => {  
  switch (action.type) {
    case FETCH_POSTS_BY_THREAD_PENDING:
      return {...initialState, fetching: true};
    case FETCH_POSTS_BY_THREAD_FULFILLED:
      return {...initialState, fetched: true, data: action.payload};
    case FETCH_POSTS_BY_THREAD_ERRORS:
      return {...initialState, errors: action.payload};
    default:
      return state;
  }
}

export default reducer;
import {
  FETCH_POSTS_BY_THREAD_PENDING,
  FETCH_POSTS_BY_THREAD_FULFILLED,
  FETCH_POSTS_BY_THREAD_ERRORS,
  CREATE_POST_FULFILLED,
  CREATE_POST_ERRORS,
} from '../actions/types';


const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: {},
  errors: null,
}

const reducer = (state=INITIAL_STATE, action) => {  
  switch (action.type) {
    case FETCH_POSTS_BY_THREAD_PENDING:
      return {...INITIAL_STATE, fetching: true};
    case FETCH_POSTS_BY_THREAD_FULFILLED:
      return {...INITIAL_STATE, fetched: true, data: action.payload};
    case FETCH_POSTS_BY_THREAD_ERRORS:
      return {...INITIAL_STATE, errors: action.payload};
    case CREATE_POST_FULFILLED:
      const newCount = state.data.count + 1;
      const newResults = [...state.data.results, action.payload]
      return {...state, data: {...state.data, count: newCount, results: newResults}};
    case CREATE_POST_ERRORS:
      return {...state, errors: action.payload};
    default:
      return state;
  }
}

export default reducer;
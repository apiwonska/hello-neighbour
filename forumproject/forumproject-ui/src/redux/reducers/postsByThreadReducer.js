import _ from 'lodash';

import {
  FETCH_POSTS_BY_THREAD_PENDING,
  FETCH_POSTS_BY_THREAD_FULFILLED,
  FETCH_POSTS_BY_THREAD_ERRORS,
  CREATE_POST_FULFILLED,
  CREATE_POST_ERRORS,
  DELETE_POST_FULFILLED,
  DELETE_POST_ERRORS,
} from '../actions/types';


const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: {},
  errors: null,
}

const reducer = (state=INITIAL_STATE, action) => {
  var count;
  var results;
  var data;
  switch (action.type) {

    case FETCH_POSTS_BY_THREAD_PENDING:
      return {...INITIAL_STATE, fetching: true};

    case FETCH_POSTS_BY_THREAD_FULFILLED:
      return {...INITIAL_STATE, fetched: true, data: action.payload};

    case FETCH_POSTS_BY_THREAD_ERRORS:
      return {...INITIAL_STATE, errors: action.payload};

    case CREATE_POST_FULFILLED:
      count = state.data.count + 1;
      results = [...state.data.results, action.payload];
      data = {...state.data, count, results};
      return {...state, data, errors: null};

    case CREATE_POST_ERRORS:
      return {...state, errors: action.payload};

    // case DELETE_POST_FULFILLED:
    //   count = state.data.count - 1;
    //   results = [...state.data.results];
    //   _.remove(results, {id: action.payload});
    //   data = {...state.data, count, results};
    //   return {...state, data, errors: null};

    default:
      return state;
  }
}

export default reducer;
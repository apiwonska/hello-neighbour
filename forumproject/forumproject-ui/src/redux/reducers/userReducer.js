import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_ERRORS,
} from '../actions/types';


const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: {},
  errors: null,
}

const reducer = (state=INITIAL_STATE, action) => {  
  switch (action.type) {
    case FETCH_USER_PENDING:
      return {...INITIAL_STATE, fetching: true};
    case FETCH_USER_FULFILLED:
      return {...INITIAL_STATE, fetched: true, data: action.payload};
    case FETCH_USER_ERRORS:
      return {...INITIAL_STATE, errors: action.payload};
    default:
      return state;
  }
}

export default reducer;
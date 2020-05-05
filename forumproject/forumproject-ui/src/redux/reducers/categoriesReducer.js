import {
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_ERRORS,
} from '../actions/types';


const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: [],
  errors: null,
}

const reducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_PENDING:
      return {...INITIAL_STATE, fetching: true};
    case FETCH_CATEGORIES_FULFILLED:
      return {...INITIAL_STATE, fetched: true, data: action.payload};
    case FETCH_CATEGORIES_ERRORS:
      return {...INITIAL_STATE, errors: action.payload}
    default:
      return state;
  }
}

export default reducer;
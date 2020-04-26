import {
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_ERRORS,
} from '../actions/types';


const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  errors: null,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_PENDING:
      return {...initialState, fetching: true};
    case FETCH_CATEGORIES_FULFILLED:
      return {...initialState, fetched: true, data: action.payload};
    case FETCH_CATEGORIES_ERRORS:
      return {...initialState, errors: action.payload}
    default:
      return state;
  }
}

export default reducer;
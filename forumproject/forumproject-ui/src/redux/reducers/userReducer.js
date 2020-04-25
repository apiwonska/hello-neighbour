import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_ERRORS,
} from '../actions/types';


const initialState = {
  fetching: false,
  fetched: false,
  data: {},
  errors: null,
}

const reducer = (state=initialState, action) => {  
  switch (action.type) {
    case FETCH_USER_PENDING:
      return {...initialState, fetching: true};
    case FETCH_USER_FULFILLED:
      return {...initialState, fetched: true, data: action.payload};
    case FETCH_USER_ERRORS:
      return {...initialState, errors: action.payload};
    default:
      return state;
  }
}

export default reducer;
import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_ERRORS,
  UPDATE_USER_PENDING,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_ERRORS,
} from "../actions/types";

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: {},
  errors: null,
  updating: false,
  updateErrors: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return { ...INITIAL_STATE, fetching: true };
    case FETCH_USER_FULFILLED:
      return { ...state, fetching: false, fetched: true, data: action.payload };
    case FETCH_USER_ERRORS:
      return { ...state, fetching: false, errors: action.payload };
    case UPDATE_USER_PENDING:
      return { ...state, updating: true };
    case UPDATE_USER_FULFILLED:
      return { ...state, updating: false, data: action.payload };
    case UPDATE_USER_ERRORS:
      return { ...state, updating: false, updateErrors: action.payload };
    default:
      return state;
  }
};

export default reducer;

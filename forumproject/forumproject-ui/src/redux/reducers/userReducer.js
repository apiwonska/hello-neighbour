import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_ERRORS,
  UPDATE_USER_PENDING,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_ERRORS,
  UPLOAD_AVATAR_PENDING,
  UPLOAD_AVATAR_FULFILLED,
  UPLOAD_AVATAR_ERRORS,
} from '../actions/types';

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: {},
  fetchingErrors: {},
  updating: false,
  updateErrors: {},
  uploading: {},
  uploadErrors: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return { ...INITIAL_STATE, fetching: true };
    case FETCH_USER_FULFILLED:
      return { ...state, fetching: false, fetched: true, data: action.payload };
    case FETCH_USER_ERRORS:
      return { ...state, fetching: false, fetchingErrors: action.payload };
    case UPDATE_USER_PENDING:
      return { ...state, updating: true };
    case UPDATE_USER_FULFILLED:
      return {
        ...state,
        updating: false,
        data: action.payload,
        updateErrors: {},
      };
    case UPDATE_USER_ERRORS:
      return { ...state, updating: false, updateErrors: action.payload };
    case UPLOAD_AVATAR_PENDING:
      return { ...state, uploading: true };
    case UPLOAD_AVATAR_FULFILLED:
      return {
        ...state,
        uploading: false,
        data: action.payload,
        uploadErrors: {},
      };
    case UPLOAD_AVATAR_ERRORS:
      return { ...state, uploading: false, uploadErrors: action.payload };
    default:
      return state;
  }
};

export default reducer;

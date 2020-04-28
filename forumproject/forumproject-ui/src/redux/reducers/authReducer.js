import {
  REGISTER_USER_PENDING,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_ERRORS,
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_ERRORS,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  processing: false,
  authenticated: '',
  user: {},
  errors: []
};

const reducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {

    case REGISTER_USER_PENDING:
    case LOGIN_USER_PENDING:
      return {...INITIAL_STATE, processing: true};
    
    case REGISTER_USER_FULFILLED:
    case LOGIN_USER_FULFILLED:
      const authenticated = action.payload['token'];
      const user = action.payload['user'];
      return {...INITIAL_STATE, authenticated, user };
    
    case REGISTER_USER_ERRORS:
    case LOGIN_USER_ERRORS:
      return {...INITIAL_STATE, errors: action.payload};
    
    case LOGOUT_USER:
      // remove Auth cookie
      return {...INITIAL_STATE}
    default:
      return state;
  }

}

export default reducer;


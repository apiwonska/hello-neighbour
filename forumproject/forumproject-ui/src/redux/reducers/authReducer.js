import Cookies from 'universal-cookie';

import {
  REGISTER_USER_PENDING,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_ERRORS,
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_ERRORS,
  LOGOUT_USER,
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_FULFILLED,
  CHANGE_PASSWORD_ERRORS
} from '../actions/types';

const cookies = new Cookies();

const getTokenFromCookie = () => {
  const token = cookies.get('Authorization');
  const user = getUserFromCookie();
  const noUserCookie = !Object.keys(user).length;
  // If there is no "User" cookie, 
  // the user will have to login to get user data
  if (noUserCookie) return '';
  return token ? token : '';
}

const getUserFromCookie = () => {
  const user = cookies.get('User');
  return user ? user : {};
}

const INITIAL_STATE = {
  processing: false,
  authenticated: getTokenFromCookie(),
  user: getUserFromCookie(),
  errors: {}
};

const reducer = (state=INITIAL_STATE, action) => {
  let token = null;
  let user = null;

  switch (action.type) {

    case REGISTER_USER_PENDING:
    case LOGIN_USER_PENDING:
    case CHANGE_PASSWORD_PENDING:
      return {
        ...state,
        processing: true,
        errors: {}
      };
    
    case REGISTER_USER_FULFILLED:
    case LOGIN_USER_FULFILLED:
      token = action.payload['token'];
      user = action.payload['user'];
      return {
        ...state,
        processing: false, 
        authenticated: token,
        user,
        errors: {}
      };
    
    case REGISTER_USER_ERRORS:
    case LOGIN_USER_ERRORS:
      return {
        ...state, 
        processing: false, 
        authenticated: '', 
        user: {}, 
        errors: action.payload
      };
    
    case CHANGE_PASSWORD_FULFILLED:
      token = action.payload['token'];
      return {
        ...state,
        processing: false,
        authenticated: token,
        errors: {}
      };

    case CHANGE_PASSWORD_ERRORS:
      return {
        ...state,
        processing: false,
        errors: action.payload
      };
    
    case LOGOUT_USER:
      return {
        ...state,
        authenticated: '',
        user: {}
      };

    default:
      return state;
  }
}

export default reducer;


import Cookies from 'universal-cookie';

import {
  REGISTER_USER_PENDING,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_ERRORS,
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_ERRORS,
  LOGOUT_USER,
} from '../actions/types';

const cookies = new Cookies();

const setCookie = (name, value) => {
  const cookieExpirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  cookies.set(name, value, {
    domain: 'localhost',
    path: '/',
    expires: cookieExpirationDate
  });
}

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
  errors: []
};

const reducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {

    case REGISTER_USER_PENDING:
    case LOGIN_USER_PENDING:
      return {...INITIAL_STATE, processing: true};
    
    case REGISTER_USER_FULFILLED:
    case LOGIN_USER_FULFILLED:
      const token = action.payload['token'];
      const user = action.payload['user'];
      setCookie('User', JSON.stringify(user));
      setCookie('Authorization', token);
      return {...INITIAL_STATE, authenticated: token, user };
    
    case REGISTER_USER_ERRORS:
    case LOGIN_USER_ERRORS:
      return {...INITIAL_STATE, errors: action.payload};
    
    case LOGOUT_USER:
      cookies.remove('Authorization');
      cookies.remove('User');
      return {...INITIAL_STATE}

    default:
      return state;
  }
}

export default reducer;


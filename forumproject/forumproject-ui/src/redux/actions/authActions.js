import axios from 'axios';
import Cookies from 'universal-cookie';

import forum from 'apis/forum';
import history from 'Routing/history';
import {
  REGISTER_USER_PENDING,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_ERRORS,
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_ERRORS,
  LOGOUT_USER,
  RESET_PASSWORD_FULFILLED,
  RESET_PASSWORD_ERRORS,
  RESET_PASSWORD_CONFIRM_FULFILLED,
  RESET_PASSWORD_CONFIRM_ERRORS,
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_FULFILLED,
  CHANGE_PASSWORD_ERRORS,
} from './types';

const cookies = new Cookies();

const setCookie = async (name, value) => {
  const cookieExpirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await cookies.set(name, value, {
    domain: 'localhost',
    path: '/',
    expires: cookieExpirationDate,
  });
};

const setAuthCookies = async (data) => {
  const { token } = data;
  let { user } = data;
  /**
   * In case of password change we only get token in response
   * And we want to change expiration date in existing cookie
   */
  if (!user) user = cookies.get('User');
  await setCookie('User', JSON.stringify(user));
  await setCookie('Authorization', token);
};

export const register = (formProps) => async (dispatch) => {
  dispatch({
    type: REGISTER_USER_PENDING,
  });
  try {
    const response = await axios.post(`/api/registration/`, formProps);
    await setAuthCookies(response.data);
    history.push('/');
    dispatch({
      type: REGISTER_USER_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_USER_ERRORS,
      payload: err.response,
    });
  }
};

export const logIn = (formProps) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER_PENDING,
  });
  try {
    const response = await axios.post(`/api/token-auth/`, formProps);
    await setAuthCookies(response.data);
    history.push('/');
    dispatch({
      type: LOGIN_USER_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_USER_ERRORS,
      payload: err.response,
    });
  }
};

export const logOut = () => async (dispatch) => {
  await cookies.remove('Authorization', {
    domain: 'localhost',
    path: '/',
  });
  await cookies.remove('User', {
    domain: 'localhost',
    path: '/',
  });
  dispatch({
    type: LOGOUT_USER,
  });
};

export const resetPassword = (formProps) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/password-reset/`, formProps);
    dispatch({
      type: RESET_PASSWORD_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_ERRORS,
      payload: err.response,
    });
  }
};

export const confirmPasswordReset = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/password-reset/confirm/`, data);
    dispatch({
      type: RESET_PASSWORD_CONFIRM_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_CONFIRM_ERRORS,
      payload: err.response,
    });
  }
};

export const changePassword = (data) => async (dispatch) => {
  dispatch({
    type: CHANGE_PASSWORD_PENDING,
  });
  try {
    const response = await forum().patch(`/api/change-password/`, data);
    await setAuthCookies(response.data);
    dispatch({
      type: CHANGE_PASSWORD_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CHANGE_PASSWORD_ERRORS,
      payload: err.response,
    });
  }
};

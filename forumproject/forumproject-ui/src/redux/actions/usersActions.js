import forum from 'apis/forum';
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
} from './types';

export const fetchUser = (userId) => async (dispatch) => {
  dispatch({
    type: FETCH_USER_PENDING,
  });
  try {
    const response = await forum().get(`/api/users/${userId}`);
    dispatch({
      type: FETCH_USER_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_USER_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateUser = (data, userId) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_PENDING,
  });
  try {
    const response = await forum().patch(`/api/users/${userId}/`, data);
    dispatch({
      type: UPDATE_USER_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERRORS,
      payload: err.response.data,
    });
  }
};

export const uploadAvatar = (formData, userId) => async (dispatch) => {
  dispatch({
    type: UPLOAD_AVATAR_PENDING,
  });
  try {
    const instance = forum();
    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    const response = await instance.patch(`/api/users/${userId}/`, formData);
    dispatch({
      type: UPLOAD_AVATAR_FULFILLED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_AVATAR_ERRORS,
      payload: err.response.data,
    });
  }
};

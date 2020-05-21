import {
  RESET_PASSWORD_FULFILLED,
  RESET_PASSWORD_ERRORS,
  RESET_PASSWORD_CONFIRM_FULFILLED,
  RESET_PASSWORD_CONFIRM_ERRORS,
} from '../actions/types';

const INITIAL_STATE = {
  emailSent: false,
  emailErrors: {},
  resetPasswordConfirmed: false,
  resetErrors: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_PASSWORD_FULFILLED:
      return { ...INITIAL_STATE, emailSent: true };

    case RESET_PASSWORD_ERRORS:
      return { ...INITIAL_STATE, emailErrors: action.payload };

    case RESET_PASSWORD_CONFIRM_FULFILLED:
      return { ...INITIAL_STATE, resetPasswordConfirmed: true };

    case RESET_PASSWORD_CONFIRM_ERRORS:
      return { ...INITIAL_STATE, resetErrors: action.payload };

    default:
      return state;
  }
};

export default reducer;

import {
  RESET_PASSWORD_FULFILLED,
  RESET_PASSWORD_ERRORS
} from '../actions/types';


const INITIAL_STATE = {
  emailSent: false,
  errors: []
};

const reducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case RESET_PASSWORD_FULFILLED:
      return {...INITIAL_STATE, emailSent: true};

    case RESET_PASSWORD_ERRORS:
      return {...INITIAL_STATE, errors: action.payload};
    
    default:
      return state;
  }
}

export default reducer;
import { MODAL_IS_OPEN, MODAL_IS_CLOSED } from '../actions/types';

const INITIAL_STATE = { isOpen: false };

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_IS_OPEN:
      return { isOpen: true };
    case MODAL_IS_CLOSED:
      return { isOpen: false };
    default:
      return state;
  }
};

export default modalReducer;

import {
  CLOSE_SIDE_DRAWER,
  OPEN_SIDE_DRAWER,
  SHOW_SIDE_NAVBAR,
  HIDE_SIDE_NAVBAR,
} from '../actions/types';

const INITIAL_STATE = {
  sideDrawerIsOpen: false,
  sideNavIsRendered: false,
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_SIDE_DRAWER:
      return { ...state, sideDrawerIsOpen: true };
    case CLOSE_SIDE_DRAWER:
      return { ...state, sideDrawerIsOpen: false };
    case SHOW_SIDE_NAVBAR:
      return { ...state, sideNavIsRendered: true };
    case HIDE_SIDE_NAVBAR:
      return { ...state, sideNavIsRendered: false };
    default:
      return state;
  }
};

export default layoutReducer;

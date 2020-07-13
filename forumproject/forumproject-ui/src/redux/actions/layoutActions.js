import {
  CLOSE_SIDE_DRAWER,
  OPEN_SIDE_DRAWER,
  SHOW_SIDE_NAVBAR,
  HIDE_SIDE_NAVBAR,
} from './types';

export const closeSideDrawer = () => {
  return { type: CLOSE_SIDE_DRAWER };
};

export const openSideDrawer = () => {
  return { type: OPEN_SIDE_DRAWER };
};

export const showSideNavbar = () => {
  return { type: SHOW_SIDE_NAVBAR };
};

export const hideSideNavbar = () => {
  return { type: HIDE_SIDE_NAVBAR };
};

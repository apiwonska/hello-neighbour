const breakpoints = {
  toggleNavAuth: 1024,
  toggleNavUnauth: 400,
};

const theme = {
  colors: {
    main: '#3F7DCE',
    secondary: '#FFBB3D',
    white: '#FCFCFC',
    neutralExtraLight: '#dedede',
    neutralLight: '#ced4da',
    neutralMidLight: '#a9a9a9',
    neutralMidDark: '#767676',
    neutralDark: '#333',
    black: '#212F3D',
    alertText: '#dc3545',
    successText: '#28a745',
  },
  fonts: {
    default: '"Open Sans", sans-serif;',
    special: '"Raleway", sans-serif;',
  },
  radius: {
    sm: '5px',
    bg: '8px',
  },
  breakpoints: breakpoints,
  pageMinWidth: '300px',
  media: {
    breakpointToggleNavAuth: `@media (min-width: ${breakpoints.toggleNavAuth}px)`,
    breakpointToggleNavUnauth: `@media (min-width: ${breakpoints.toggleNavUnauth}px)`,
    minLandscapePhone: '@media (min-width: 576px)',
    minTablet: '@media (min-width: 728px)',
    minDesktop: '@media (min-width: 1024px)',
  },
};

export default theme;

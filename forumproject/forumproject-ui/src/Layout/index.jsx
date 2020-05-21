import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import theme from './theme';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: ${theme.fonts.default};
    color: ${theme.colors.black};
    line-height: 1.45;
  }

  body {
    padding: 0;
    margin: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  a, input:focus {
    outline: none;
  }

  button::-moz-focus-inner {
    border: 0;
  }
`;

const StyledWrapper = styled.div`
  min-height: 100vh;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.white};
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <StyledWrapper>{children}</StyledWrapper>
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
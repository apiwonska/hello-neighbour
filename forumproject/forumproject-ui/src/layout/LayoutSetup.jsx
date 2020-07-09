import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import theme from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Raleway:wght@400;600;700&display=swap');
  
  html {
    font-family: ${theme.fonts.default};
    color: ${theme.colors.black};
    line-height: 1.45;
    font-size: 10px;
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

  h1 { font-size: 3.2rem}

  h2 { font-size: 2.4rem}

  h3 { font-size: 1.9rem}

  h4 { font-size: 1.6rem}
  
  h5 { font-size: 12.8rem}

  button::-moz-focus-inner {
    border: 0;
  }
`;

const StyledWrapper = styled.div`
  min-height: 100vh;
  min-width: ${theme.pageMinWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LayoutSetup = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <StyledWrapper>{children}</StyledWrapper>
    </>
  </ThemeProvider>
);

LayoutSetup.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LayoutSetup;

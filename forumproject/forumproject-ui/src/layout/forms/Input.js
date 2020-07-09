import styled from 'styled-components';

import theme from 'layout/theme';

export default styled.input`
  border-width: 0;
  border-bottom: 0.2rem solid ${theme.colors.black};
  background-color: transparent;
  font-family: ${theme.fonts.default};
  font-size: 1.6rem;
  color: ${theme.colors.black};

  &,
  &:hover,
  &:focus,
  &:active {
    transition-delay: 9999s;
    transition-property: background-color, color;
  }
`;

import styled from 'styled-components';

import theme from 'layout/theme';

export default styled.label`
  position: absolute;
  top: 2rem;
  font-family: ${theme.fonts.default};
  color: ${theme.colors.neutralMidDark};
  pointer-events: none;
  transform: translateY(0);
  transition: 0.4s;
  font-size: 1.6rem;

  ${({ dirty }) => {
    if (dirty) return 'transform: translateY(-100%);';
  }}
`;

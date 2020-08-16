import styled, { keyframes } from 'styled-components';

import theme from '../theme';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;

  border-top: 0px solid ${theme.colors.neutralLight};
  border-right: 1px solid ${theme.colors.neutralLight};
  border-bottom: 2px solid ${theme.colors.neutralLight};
  border-left: 3px solid ${theme.colors.neutralLight};
  background: transparent;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

export const WrapperDiv = styled.div`
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

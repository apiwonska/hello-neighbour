import styled, { keyframes } from 'styled-components';

import theme from '../../Layout/theme';

const headerHeight = '60px';
const footerHeight = '60px';

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
  transform: translateZ(0);

  border-top: 0px solid ${theme.colors.neutralLight};
  border-right: 1px solid ${theme.colors.neutralLight};
  border-bottom: 2px solid ${theme.colors.neutralLight};
  border-left: 3px solid ${theme.colors.neutralLight};
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const WrapperDiv = styled.div`
  min-height: 300px;
`;

export const InnerWrapperDiv = styled.div`
  position: absolute;
  top: ${headerHeight};
  bottom: ${footerHeight};
  left: 0;
  width: 100%;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

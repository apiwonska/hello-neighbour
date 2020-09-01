import styled from 'styled-components';

import theme from '../../theme';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  min-width: ${theme.pageMinWidth};
  background-color: ${theme.colors.neutralLight};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 100;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
  background-color: ${theme.colors.white};

  @media (min-width: 650px) {
    flex-grow: 0;
    max-width: 650px;
    margin: auto;
  }
`;

import styled from 'styled-components';

import theme from '../theme';

const StyledFooter = styled.footer`
  margin-top: auto;
  display: flexbox;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  font-size: 14px;
`;

export default StyledFooter;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from 'layout/theme';

export default styled(Link)`
  color: ${theme.colors.main};
  transition: 0.5s;
  font-weight: 600;

  &:hover {
    color: #275999;
  }
`;

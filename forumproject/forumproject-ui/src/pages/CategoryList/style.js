import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from '../../layout';

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px auto;
  padding: 0 20px;
  min-height: 50px;
  max-width: 600px;
  border: 2px solid ${theme.colors.main};
  border-radius: ${theme.radius.bg};
  box-shadow: 0 0 4px ${theme.colors.neutralMidLight};
  text-transform: capitalize;
`;

export const CategoryLink = styled(Link)`
  color: ${theme.colors.black};
  text-decoration: none;

  &:hover {
    color: black;
  }
`;

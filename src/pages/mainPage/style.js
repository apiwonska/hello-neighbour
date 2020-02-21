import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../../layout/utils/theme';

export const ContainerDiv = styled.div`
  max-width: 1000px;
  width: 100%;
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px auto;
  padding: 0 20px;
  min-height: 50px;
  width: 90%;
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
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from 'layout/theme';

export const NavUl = styled.ul`
  text-transform: capitalize;
  font-size: 1.6rem;
  line-height: 1.2;
  list-style: none;
  color: ${theme.colors.neutralMidLight};
`;

export const NavUlInner = styled(NavUl)`
  padding-left: 1.5rem;
`;

export const NavLi = styled.li`
  margin-top: 1rem;
`;

export const NavLiInner = styled(NavLi)``;

export const NavLink = styled(Link)`
  color: ${theme.colors.white};
  line-height: 1.2;
  text-decoration: none;
  transition: 0.5s;

  &:hover {
    font-weight: 600;
    color: ${theme.colors.black};
  }

  ${({ active }) => (active ? `color:${theme.colors.black};` : '')}
`;

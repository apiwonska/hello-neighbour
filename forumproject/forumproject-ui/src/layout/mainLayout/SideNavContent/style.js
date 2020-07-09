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
  /* position: relative; */
  color: ${theme.colors.white};
  line-height: 1.2;
  text-decoration: none;
  /* transition: 1s; */

  /* :after {
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    width: 0;
    height: 1.4rem;
    background-color: ${theme.colors.white};
    content: '';
    transition: 1s;
  } */

  :hover {
    font-weight: 600;
    /* padding-left: 1rem; */
    color: ${theme.colors.white};

    /* :after {
      width: 0.5rem;
    } */
  }
`;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from 'layout/theme';

const navbarHeight = '6rem';

export const NavSection = styled.section`
  height: ${navbarHeight};
  width: 100%;
  background-color: ${({ auth }) =>
    auth ? theme.colors.white : 'transparent'};
  ${({ auth }) => (auth ? 'box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);' : '')}
  z-index: 1;
`;

export const NavContainerDiv = styled.div`
  margin: 0 2rem;
  display: flex;
`;

export const BrandDiv = styled.div`
  height: ${navbarHeight};
`;

export const ProjectName = styled.span`
  font-family: ${theme.fonts.special};
  font-size: 2.4rem;
  font-weight: 700;
  color: ${theme.colors.black};
`;

export const Nav = styled.nav`
  margin-left: auto;
`;

export const NavToggleButton = styled.button`
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  border: 0;
  margin: 0 -0.5rem 0 0;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  align-self: center;
  cursor: pointer;

  :hover {
    background-color: ${theme.colors.secondary};
  }

  ${({ auth }) => {
    return auth
      ? theme.media.breakpointToggleNavAuth
      : theme.media.breakpointToggleNavUnauth;
  }} {
    display: none;
  }
`;

export const NavUl = styled.ul`
  display: none;

  ${({ auth }) => {
    return auth
      ? theme.media.breakpointToggleNavAuth
      : theme.media.breakpointToggleNavUnauth;
  }} {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const NavLi = styled.li`
  height: ${navbarHeight};

  :hover {
    color: ${theme.colors.black};
    background-color: ${theme.colors.neutralLight};
    cursor: pointer;
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  color: ${theme.colors.black};
  text-decoration: none;
  font-size: 1.6rem;
`;

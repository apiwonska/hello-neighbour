import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../../layout/utils/theme';

const navbarHeight = '60px';
const navbarMediaBreakpoint = theme.media.landscapePhone;

export const NavSection = styled.section`
  height: ${navbarHeight};
  width: 100%;
  background-color: ${theme.colors.white};
  box-shadow: 0 4px 4px ${theme.colors.neutralLight};
  margin-bottom: 40px;
`;

export const NavContainerDiv = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  ${navbarMediaBreakpoint} {
    display: flex;
  }
`;

export const BrandDiv = styled.div`
  display: flex;
  align-items: center;
  height: ${navbarHeight};
  padding: 0 20px;
`;

export const LogoImg = styled.img`
  height: 50px;
`;

export const Nav = styled.nav`
  margin-left: auto;
`;

export const NavToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  border: 0;
  margin: 0;
  padding: 0;

  ${navbarMediaBreakpoint} {
    display: none;
  }
`;

const StyledUl = styled.ul``;

export const NavUl = styled(StyledUl)`
  position: absolute;
  display: ${(props) => (!props.showMenu ? 'none' : 'block')};
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: ${theme.colors.white};
  box-shadow: 0 4px 4px ${theme.colors.neutralLight};

  ${navbarMediaBreakpoint} {
    position: static;
    display: flex;
    box-shadow: none;
  }
`;

export const NavLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  :hover {
    color: ${theme.colors.black};
    background-color: ${theme.colors.neutralLight};
    cursor: pointer;
  }

  ${navbarMediaBreakpoint} {
    height: ${navbarHeight};
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  color: ${theme.colors.black};
  text-decoration: none;
`;

export const NavLiBtn = styled.button`
  font-size: 16px;
  font-family: ${theme.fonts.default};
  color: ${theme.colors.black};
  border: 0;
  padding: 0 20px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);

  :hover {
    cursor: pointer;
  }
`;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from 'layout/theme';
import { SVGIcon } from 'layout';

export const Section = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: ${theme.colors.main};
  transform: translateX(-100%);
  transition: 0.5s transform;
  z-index: 100;

  ${({ show }) => {
    if (show) return 'transform: translateX(0);';
    return '';
  }}
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;

  ${({ show }) => {
    if (!show) return 'display: none;';
    return null;
  }}
`;

export const DrawerHeader = styled.header`
  position: relative;
  height: 60px;
  display: flex;
  padding-left: 2rem;
  align-items: center;

  :before {
    position: absolute;
    content: '';
    bottom: 0.5rem;
    left: 2rem;
    width: 15rem;
    height: 0.2rem;
    background-color: ${theme.colors.neutralExtraLight};
  }
`;

export const NavToggleButton = styled.button`
  color: ${theme.colors.white};
  background-color: ${theme.colors.main};
  border: 0;
  margin: 0 -0.5rem 0 0;
  padding: 0.7rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  align-self: center;
  cursor: pointer;
  transition: 0.5s;

  :hover {
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
  }
`;

export const BrandDiv = styled.div`
  height: 60px;
`;

export const ProjectName = styled.span`
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.special};
  font-size: 2.4rem;
  font-weight: 700;
  color: ${theme.colors.white};
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.black};
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

export const BubbleIcon = styled(SVGIcon)`
  width: 2.2rem;
  margin-right: 0.5rem;
  transform: scaleX(-1);
`;

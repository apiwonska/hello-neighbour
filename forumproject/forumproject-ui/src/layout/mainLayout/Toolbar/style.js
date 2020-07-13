import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from 'layout/theme';

const navbarHeight = '6rem';

const AuthNavSection = styled.section`
  height: ${navbarHeight};
  width: 100%;
  background-color: ${theme.colors.white};
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
`;

const UnauthNavSection = styled(AuthNavSection)`
  background-color: transparent;
  box-shadow: none;
`;

export const NavSection = ({ auth, children }) => {
  return auth ? (
    <AuthNavSection>{children}</AuthNavSection>
  ) : (
    <UnauthNavSection>{children}</UnauthNavSection>
  );
};

NavSection.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

NavSection.defaultProps = { auth: false };

export const NavContainerDiv = styled.div`
  margin: 0 2rem;
  display: flex;
`;

export const BrandDiv = styled.div`
  height: ${navbarHeight};
`;

const AuthProjectName = styled.span`
  font-family: ${theme.fonts.special};
  font-size: 2.4rem;
  font-weight: 700;
  color: ${theme.colors.black};
`;

const UnauthProjectName = styled(AuthProjectName)`
  color: ${theme.colors.white};

  &:hover {
    color: ${theme.colors.black};
  }
`;

export const ProjectName = ({ auth, ...passThroughProps }) => {
  return auth ? (
    <AuthProjectName {...passThroughProps} />
  ) : (
    <UnauthProjectName {...passThroughProps} />
  );
};

ProjectName.propTypes = {
  auth: PropTypes.bool,
};

ProjectName.defaultProps = { auth: false };

export const Nav = styled.nav`
  margin-left: auto;
`;

const AuthNavToggleButton = styled.button`
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

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  ${theme.media.breakpointNavAuth} {
    display: none;
  }
`;

const UnauthNavToggleButton = styled(AuthNavToggleButton)`
  color: ${theme.colors.white};
  background-color: transparent;

  &:hover {
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
  }

  ${theme.media.breakpointNavUnauth} {
    display: none;
  }
`;

export const NavToggleButton = ({ auth, ...passThroughProps }) => {
  return auth ? (
    <AuthNavToggleButton {...passThroughProps} />
  ) : (
    <UnauthNavToggleButton {...passThroughProps} />
  );
};

NavToggleButton.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export const NavUl = styled.ul`
  display: none;

  ${({ auth }) => {
    return auth
      ? theme.media.breakpointNavAuth
      : theme.media.breakpointNavUnauth;
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
    cursor: pointer;
  }
`;

const AuthNavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  color: ${theme.colors.black};
  text-decoration: none;
  font-size: 1.6rem;
`;

const UnauthNavLink = styled(AuthNavLink)`
  color: ${theme.colors.white};
  &:hover {
    color: ${theme.colors.black};
  }
`;

export const NavLink = ({ auth, ...passThroughProps }) => {
  return auth ? (
    <AuthNavLink {...passThroughProps} />
  ) : (
    <UnauthNavLink {...passThroughProps} />
  );
};

NavLink.propTypes = {
  auth: PropTypes.bool,
};

NavLink.defaultProps = { auth: false };

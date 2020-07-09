import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import {
  NavSection,
  NavContainerDiv,
  BrandDiv,
  ProjectName,
  Nav,
  NavUl,
  NavLi,
  NavLink,
  NavToggleButton,
} from './style';

const Toolbar = ({ auth, sideDrawerIsOpen, toggleSideDrawer }) => {
  const renderMenu = () => {
    if (!auth) {
      return (
        <>
          <NavLi>
            <NavLink to="/auth">Log In</NavLink>
          </NavLi>
          <NavLi>
            <NavLink to="/register">Register</NavLink>
          </NavLi>
        </>
      );
    }
  };

  return (
    <NavSection auth={auth}>
      <NavContainerDiv>
        <NavToggleButton auth={auth} onClick={toggleSideDrawer}>
          <FontAwesomeIcon icon={faBars} />
        </NavToggleButton>
        <BrandDiv>
          <NavLink to="/">
            <ProjectName>Forum</ProjectName>
          </NavLink>
        </BrandDiv>
        <Nav>
          <NavUl auth={auth}>{renderMenu()}</NavUl>
        </Nav>
      </NavContainerDiv>
    </NavSection>
  );
};

Toolbar.propTypes = {
  auth: PropTypes.bool,
};

Toolbar.defaultProps = {
  auth: false,
};

const mapStateToProps = (state) => {
  return {
    auth: !!state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Toolbar);

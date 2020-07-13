import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { openSideDrawer } from 'redux/actions';
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

const Toolbar = () => {
  const auth = useSelector((state) => !!state.auth.authenticated);
  const dispatch = useDispatch();
  const boundOpenSideDrawer = () => dispatch(openSideDrawer());

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
    return null;
  };

  return (
    <NavSection auth={auth}>
      <NavContainerDiv>
        <NavToggleButton auth={auth} onClick={boundOpenSideDrawer}>
          <FontAwesomeIcon icon={faBars} />
        </NavToggleButton>
        <BrandDiv>
          <NavLink to="/">
            <ProjectName auth={auth}>Forum</ProjectName>
          </NavLink>
        </BrandDiv>
        <Nav>
          <NavUl auth={auth}>{renderMenu()}</NavUl>
        </Nav>
      </NavContainerDiv>
    </NavSection>
  );
};

export default Toolbar;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openSideDrawer } from 'redux/actions';
import { SVGIcon } from 'layout';
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
  BubbleIcon,
  UserIcon,
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
            <NavLink to="/auth">
              <UserIcon name="user" />
              Log In
            </NavLink>
          </NavLi>
          <NavLi>
            <NavLink to="/register">
              <UserIcon name="add_user" />
              Register
            </NavLink>
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
          <SVGIcon name="menu" />
        </NavToggleButton>
        <BrandDiv>
          <NavLink to="/">
            <ProjectName auth={auth}>
              <BubbleIcon name="speach_bubble" />
              Forum
            </ProjectName>
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

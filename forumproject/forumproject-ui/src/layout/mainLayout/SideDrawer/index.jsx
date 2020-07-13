import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { closeSideDrawer } from 'redux/actions';
import SideNavContent from '../SideNavContent';
import {
  Section,
  Overlay,
  DrawerHeader,
  NavToggleButton,
  BrandDiv,
  NavLink,
  ProjectName,
} from './style';

const SideDrawer = () => {
  const sideDrawerIsOpen = useSelector(
    (state) => state.layout.sideDrawerIsOpen
  );
  const dispatch = useDispatch();
  const boundCloseSideDrawer = () => dispatch(closeSideDrawer());

  return (
    <>
      <Overlay onClick={boundCloseSideDrawer} show={sideDrawerIsOpen} />
      <Section show={sideDrawerIsOpen}>
        <DrawerHeader>
          <NavToggleButton onClick={boundCloseSideDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </NavToggleButton>
          <BrandDiv>
            <NavLink to="/" onClick={boundCloseSideDrawer}>
              <ProjectName>Forum</ProjectName>
            </NavLink>
          </BrandDiv>
        </DrawerHeader>
        <SideNavContent />
      </Section>
    </>
  );
};

export default SideDrawer;

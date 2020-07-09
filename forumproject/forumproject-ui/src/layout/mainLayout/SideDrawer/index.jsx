import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import {
  Section,
  Overlay,
  DrawerHeader,
  NavToggleButton,
  BrandDiv,
  NavLink,
  ProjectName,
} from './style';

const SideDrawer = ({ children, sideDrawerIsOpen, closeSideDrawer }) => {
  return (
    <>
      <Overlay onClick={closeSideDrawer} show={sideDrawerIsOpen} />
      <Section show={sideDrawerIsOpen}>
        <DrawerHeader>
          <NavToggleButton onClick={closeSideDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </NavToggleButton>
          <BrandDiv>
            <NavLink to="/" onClick={closeSideDrawer}>
              <ProjectName>Forum</ProjectName>
            </NavLink>
          </BrandDiv>
        </DrawerHeader>
        {children}
      </Section>
    </>
  );
};

export default SideDrawer;

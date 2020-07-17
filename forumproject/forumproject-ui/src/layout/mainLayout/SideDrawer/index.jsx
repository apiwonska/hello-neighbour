import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeSideDrawer } from 'redux/actions';
import SideNavContent from '../SideNavContent';
import { SVGIcon } from 'layout';
import {
  Section,
  Overlay,
  DrawerHeader,
  NavToggleButton,
  BrandDiv,
  NavLink,
  ProjectName,
  BubbleIcon,
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
            <SVGIcon name="menu" />
          </NavToggleButton>
          <BrandDiv>
            <NavLink to="/" onClick={boundCloseSideDrawer}>
              <ProjectName>
                <BubbleIcon name="speach_bubble" />
                Forum
              </ProjectName>
            </NavLink>
          </BrandDiv>
        </DrawerHeader>
        <SideNavContent />
      </Section>
    </>
  );
};

export default SideDrawer;

import React, { useState } from 'react';

import { Wrapper, MoreBtn } from './style';
import { SVGIcon } from 'layout';
import DropdownList from './DropdownList';

function MenuDropdown({ dropdownOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <Wrapper>
      <MoreBtn
        onClick={toggle}
        isOpen={isOpen}
        className="ignore-react-onclickoutside"
      >
        <SVGIcon name="more_vert" />
      </MoreBtn>
      {isOpen && (
        <DropdownList
          dropdownOptions={dropdownOptions}
          closeDropdown={closeDropdown}
        />
      )}
    </Wrapper>
  );
}

export default MenuDropdown;

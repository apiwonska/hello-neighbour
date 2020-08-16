import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SVGIcon from '../icons/SVGIcon';
import { Wrapper, MoreBtn } from './style';
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

MenuDropdown.propTypes = {
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MenuDropdown;

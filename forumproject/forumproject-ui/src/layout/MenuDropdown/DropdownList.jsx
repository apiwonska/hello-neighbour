import React from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';

import SVGIcon from '../icons/SVGIcon';
import { DropdownWrapper, Option, IconSpan } from './style';

function DropdownList({ dropdownOptions, closeDropdown }) {
  DropdownList.handleClickOutside = closeDropdown;

  const renderOptionList = () => {
    return dropdownOptions.map((option) => {
      return (
        <Option
          key={option.label}
          onClick={() => {
            option.onClick();
            closeDropdown();
          }}
        >
          <IconSpan>
            <SVGIcon name={option.icon} />
          </IconSpan>
          {option.label}
        </Option>
      );
    });
  };

  return <DropdownWrapper>{renderOptionList()}</DropdownWrapper>;
}

const clickOutsideConfig = {
  handleClickOutside: () => DropdownList.handleClickOutside,
};

DropdownList.propTypes = {
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default onClickOutside(DropdownList, clickOutsideConfig);

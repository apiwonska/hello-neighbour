import React from 'react';
import onClickOutside from 'react-onclickoutside';

import { DropdownWrapper, Option, IconSpan } from './style';
import { SVGIcon } from 'layout';

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

export default onClickOutside(DropdownList, clickOutsideConfig);

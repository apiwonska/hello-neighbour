import React from 'react';
import PropTypes from 'prop-types';

import { MenuDropdown } from 'layout';

const Dropdown = ({ postId, onClickEdit, onClickDelete }) => (
  <MenuDropdown
    dropdownOptions={[
      {
        label: 'Edit',
        onClick: () => {
          onClickEdit(postId);
        },
        icon: 'edit',
      },
      {
        label: 'Delete',
        onClick: () => onClickDelete(postId),
        icon: 'trash',
      },
    ]}
  />
);

Dropdown.propTypes = {
  postId: PropTypes.number.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default Dropdown;

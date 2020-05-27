import React from 'react';
import PaginationMUI from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

// count - number of pages to display
const Pagination = (props, { count }) => {
  if (count > 1) {
    return <PaginationMUI {...props} />;
  }
  return null;
};

Pagination.popTypes = {
  count: PropTypes.number.isRequired,
};

export default Pagination;

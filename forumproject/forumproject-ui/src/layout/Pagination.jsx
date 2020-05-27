import React from 'react';
import PaginationMUI from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

// count - number of pages to display
const Pagination = (props) => {
  const { count } = props;
  if (count > 1) {
    return <PaginationMUI {...props} />;
  }
  return null;
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Pagination;

import React from 'react';
import { Pagination as PaginationZDG } from '@zendeskgarden/react-pagination';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { totalPages } = props;
  if (totalPages > 1) {
    return <PaginationZDG {...props} />;
  }
  return null;
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;

import React from 'react';
import PaginationMUI from '@material-ui/lab/Pagination';

// count - number of pages to display
export default (props) => {
  if (props.count > 1) {
    return <PaginationMUI {...props} />;
  }
  return null;
};

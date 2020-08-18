import React from 'react';
import PropTypes from 'prop-types';

import NotFound from 'pages/NotFound';

const withHandleNotFound = (Cmp) => {
  const Wrapped = ({ notFound, ...passThroughProps }) => {
    if (notFound) {
      return <NotFound />;
    }
    return <Cmp {...passThroughProps} />;
  };

  Wrapped.propTypes = {
    notFound: PropTypes.bool.isRequired,
  };

  return Wrapped;
};

export default withHandleNotFound;

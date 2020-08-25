import React from 'react';
import PropTypes from 'prop-types';

import PageNotFound from 'pages/PageNotFound';

const withHandleNotFound = (Cmp) => {
  const Wrapped = ({ notFound, ...passThroughProps }) => {
    if (notFound) {
      return <PageNotFound />;
    }
    return <Cmp {...passThroughProps} />;
  };

  Wrapped.propTypes = {
    notFound: PropTypes.bool.isRequired,
  };

  return Wrapped;
};

export default withHandleNotFound;

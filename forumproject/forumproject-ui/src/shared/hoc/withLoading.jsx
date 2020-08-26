import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'layout';

const withLoading = (Cmp) => {
  const Wrapped = ({ fetching, fetched, ...passThroughProps }) => {
    if (fetching) {
      return <Spinner />;
    }
    if (fetched) {
      return <Cmp {...passThroughProps} />;
    }
    return <></>;
  };

  Wrapped.propTypes = {
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  };

  return Wrapped;
};

export default withLoading;

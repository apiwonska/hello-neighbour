import React from 'react';
import PropTypes from 'prop-types';

import { DefaultError } from 'layout';

const withHandleErrors = (Cmp) => {
  const Wrapped = ({ errors, ...passThroughProps }) => {
    if (errors) {
      return <DefaultError />;
    }
    return <Cmp {...passThroughProps} />;
  };

  Wrapped.propTypes = {
    errors: PropTypes.bool.isRequired,
  };

  return Wrapped;
};

export default withHandleErrors;

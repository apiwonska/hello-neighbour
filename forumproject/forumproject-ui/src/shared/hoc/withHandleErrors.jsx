import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { DefaultError } from 'shared/errors';

const withHandleErrors = (Cmp) => {
  const Wrapped = ({ errors, ...passThroughProps }) => {
    if (!_.isEmpty(errors)) {
      return <DefaultError />;
    }
    return <Cmp {...passThroughProps} />;
  };

  Wrapped.propTypes = {
    errors: PropTypes.shape({}).isRequired,
  };

  return Wrapped;
};

export default withHandleErrors;

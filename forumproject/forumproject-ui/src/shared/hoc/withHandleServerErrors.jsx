import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { ServerError } from 'layout';

const isServerError = (errors) => {
  const statusCode = errors.status.toString();
  return /^5/.test(statusCode);
};

const withHandleServerErrors = (Cmp) => {
  const Wrapped = ({ errors, ...passThroughProps }) => {
    if (!_.isEmpty(errors) && isServerError(errors)) {
      return <ServerError />;
    }

    return <Cmp {...passThroughProps} />;
  };

  Wrapped.propTypes = {
    errors: PropTypes.shape({}).isRequired,
  };

  return Wrapped;
};

export default withHandleServerErrors;

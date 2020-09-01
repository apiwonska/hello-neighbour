import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { DefaultError, Error404, ServerError } from 'layout';

const isClientError = (errors) => {
  const statusCode = errors.status.toString();
  return /^4/.test(statusCode);
};

const isServerError = (errors) => {
  const statusCode = errors.status.toString();
  return /^5/.test(statusCode);
};

const withHandleErrors = (Cmp) => {
  const Wrapped = ({ errors, ...passThroughProps }) => {
    if (!_.isEmpty(errors) && isServerError(errors)) {
      return <ServerError />;
    }

    if (!_.isEmpty(errors) && isClientError) {
      if (errors.status === 404) return <Error404 />;
      return <DefaultError />;
    }

    return <Cmp {...passThroughProps} />;
  };

  Wrapped.propTypes = {
    errors: PropTypes.shape({ status: PropTypes.number }).isRequired,
  };

  return Wrapped;
};

export default withHandleErrors;

import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({ message }) => {
  return <h2>{message}</h2>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export const DefaultError = () => {
  return <Error message="Something went wrong. Please, try again later." />;
};

export const NotFound = () => {
  return <Error message="Not found" />;
};

export const renderPageError = (err) => {
  if (err) {
    // eslint-disable-next-line no-prototype-builtins
    const hasMessageProperty = Object.prototype.hasOwnProperty(err, 'message');
    const errorMessage = hasMessageProperty && err.message;
    const error404 =
      typeof errorMessage === 'string' && errorMessage.includes('404');

    if (error404) {
      return <NotFound />;
    }
    return <DefaultError />;
  }
  return null;
};

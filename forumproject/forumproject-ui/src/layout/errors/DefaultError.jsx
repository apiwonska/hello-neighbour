import React from 'react';

import Error from './Error';

const DefaultError = () => {
  return (
    <Error
      title="Error"
      errorMessage=""
      errorExplanation="Something went wrong. Please, try again later."
    />
  );
};

export default DefaultError;

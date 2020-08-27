import React from 'react';

import DefaultError from '../DefaultError';

const Error500 = () => {
  return (
    <DefaultError
      errorMessage="Server Error"
      errorExplanation="We are experiencing problems right now. Please try again later."
    />
  );
};

export default Error500;

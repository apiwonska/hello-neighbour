import React from 'react';

import Error from '../Error';
import PageNotFoundPicture from './PageNotFoundPicture';

const Error404 = () => {
  return (
    <Error
      title="Error"
      errorMessage="This page isn't available"
      errorExplanation="The link you followed may be broken, or the page may have been removed."
      picture={<PageNotFoundPicture />}
    />
  );
};

export default Error404;

import React from 'react';
import PropTypes from 'prop-types';

import PageTitleBlock from '../../PageTitleBlock';
import {
  ContentWrapper,
  ErrorMessage,
  ErrorExplanation,
  PictureWrapper,
} from './style';

const Error = ({ title, errorMessage, errorExplanation, picture }) => {
  return (
    <>
      {title.length !== 0 && <PageTitleBlock title={title} />}

      <ContentWrapper>
        {errorMessage.length !== 0 && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        {ErrorExplanation.length !== 0 && (
          <ErrorExplanation>{errorExplanation}</ErrorExplanation>
        )}
        {picture && <PictureWrapper>{picture}</PictureWrapper>}
      </ContentWrapper>
    </>
  );
};

Error.propTypes = {
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  errorExplanation: PropTypes.string,
  picture: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([null])]),
};

Error.defaultProps = {
  title: '',
  errorMessage: '',
  errorExplanation: '',
  picture: null,
};

export default Error;

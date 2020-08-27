import React from 'react';
import PropTypes from 'prop-types';

import PageTitleBlock from '../../PageTitleBlock';
import {
  ContentWrapper,
  ErrorMessage,
  ErrorExplanation,
  PictureWrapper,
} from './style';

const DefaultError = ({ title, errorMessage, errorExplanation, picture }) => {
  return (
    <>
      <PageTitleBlock title={title} />

      <ContentWrapper>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        {ErrorExplanation && (
          <ErrorExplanation>{errorExplanation}</ErrorExplanation>
        )}
        {picture && <PictureWrapper>{picture}</PictureWrapper>}
      </ContentWrapper>
    </>
  );
};

DefaultError.propTypes = {
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  errorExplanation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  picture: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.oneOf([null]),
  ]),
};

DefaultError.defaultProps = {
  title: 'Error',
  errorMessage: 'Something went wrong. Please, try again later.',
  errorExplanation: null,
  picture: null,
};

export default DefaultError;

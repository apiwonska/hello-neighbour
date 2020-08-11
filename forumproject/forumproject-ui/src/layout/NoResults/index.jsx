import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, PictureWrapper, NoResultsText } from './style';
import NoResultsPicture from './NoResultsPicture';

const NoResults = ({ picture, children }) => {
  return (
    <Wrapper>
      <PictureWrapper>{picture}</PictureWrapper>
      <NoResultsText>{children}</NoResultsText>
    </Wrapper>
  );
};

NoResults.propTypes = {
  picture: PropTypes.element,
  children: PropTypes.string.isRequired,
};

NoResults.defaultProps = {
  picture: <NoResultsPicture />,
};

export default NoResults;

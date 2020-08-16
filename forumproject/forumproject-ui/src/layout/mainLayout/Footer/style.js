import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../theme';

const AuthFooter = styled.footer`
  margin-top: auto;
  display: flexbox;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6rem;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  font-size: 1.4rem;
`;

const UnauthFooter = styled(AuthFooter)`
  background-color: ${theme.colors.accessPageBackgroundColor};
  text-shadow: 0.1rem 0.1rem 0.3rem ${theme.colors.main};
`;

const StyledFooter = ({ auth, ...passThroughProps }) => {
  return auth ? (
    <AuthFooter {...passThroughProps} />
  ) : (
    <UnauthFooter {...passThroughProps} />
  );
};

StyledFooter.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default StyledFooter;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from 'layout/theme';

const AuthFooter = styled.footer`
  margin-top: auto;
  display: flexbox;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  font-size: 14px;
`;

const UnauthFooter = styled(AuthFooter)`
  background-color: transparent;
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

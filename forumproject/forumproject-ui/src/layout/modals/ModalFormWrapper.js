import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const OuterWrapper = styled.div`
  display: flex;
`;
const InnerWrapper = styled.div`
  margin: 0 auto;
  max-width: 30rem;
  width: 100%;
`;

const ModalFormWrapper = ({ children }) => (
  <OuterWrapper>
    <InnerWrapper>{children}</InnerWrapper>
  </OuterWrapper>
);

ModalFormWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ModalFormWrapper;

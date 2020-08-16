import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import theme from 'layout/theme';

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 2rem;
  font-size: 1.4rem;
  color: ${theme.colors.neutralMidDark};
  list-style: none;
  padding-left: 0;
  margin-left: 0;
`;

const Breadcrumb = ({ children }) => {
  return (
    <nav>
      <Ul>{children}</Ul>
    </nav>
  );
};

Breadcrumb.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Breadcrumb;

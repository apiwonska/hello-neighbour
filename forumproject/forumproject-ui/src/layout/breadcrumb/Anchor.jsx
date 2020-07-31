import React from 'react';
import styled from 'styled-components';
import { Link as Link_ } from 'react-router-dom';
import PropTypes from 'prop-types';

import SVGIcon from 'layout/icons/SVGIcon';
import theme from 'layout/theme';

const Li = styled.li`
  margin-right: 0.7rem;
`;

const Link = styled(Link_)`
  color: ${theme.colors.main};
  text-decoration: none;

  &:hover {
    color: #235089;
  }
`;

const Arrow = styled.li`
  width: 1rem;
  margin-right: 0.7rem;
`;

const Anchor = ({ href, children }) => {
  return (
    <>
      <Li>
        <Link to={href}>{children}</Link>
      </Li>
      <Arrow>
        <SVGIcon name="arrow_right" />
      </Arrow>
    </>
  );
};

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Element).isRequired,
};

export default Anchor;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ICONS from './ICONS';

const Svg = styled.svg.attrs({})``;

const SVGIcon = ({ name, fill, className }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={ICONS[name].viewBox || '0 0 24 24'}
    width="100%"
    height="100%"
    fill={fill}
    className={className}
  >
    <path d={ICONS[name].path} />
  </Svg>
);

SVGIcon.propTypes = {
  name: PropTypes.string.isRequired,
  fill: PropTypes.string,
  className: PropTypes.string,
};

SVGIcon.defaultProps = {
  fill: 'currentColor',
  className: '',
};

export default SVGIcon;

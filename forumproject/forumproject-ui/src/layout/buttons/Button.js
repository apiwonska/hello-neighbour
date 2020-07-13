import styled from 'styled-components';
import theme from 'layout/theme';

import BasicButton from './BasicButton';

const ButtonWithSize = styled(BasicButton)`
  min-width: ${({ size }) => {
    if (size === 'S') return '15rem';
    if (size === 'L') return '20rem';
    if (size === 'XL') return '25rem';
    return null;
  }};
  min-height: ${({ size }) => {
    if (size === 'S') return '3rem';
    if (size === 'L') return '4rem';
    if (size === 'XL') return '5rem';
    return null;
  }};
  font-size: ${({ size }) => {
    if (size === 'S') return '1.6rem';
    if (size === 'L') return '2rem';
    if (size === 'XL') return '2.4rem';
    return null;
  }};
`;

const yellowButton = `
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.white};
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: #ffa90a;
  }

  &:disabled, &:disabled:hover {
    background-color: #FFD589;
    color: ${theme.colors.white};
    transform: translateY(0);
  }
`;

const ButtonWithColor = styled(ButtonWithSize)`
  ${({ color }) => {
    if (color === 'yellow') return yellowButton;
    return null;
  }}
`;

export default ButtonWithColor;

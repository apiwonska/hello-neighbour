import styled from 'styled-components';
import theme from 'layout/theme';

import BasicButton from './BasicButton';

const ButtonWithSize = styled(BasicButton)`
  min-width: ${({ size }) => {
    if (size === 'S') return '10rem';
    if (size === 'M') return '15rem';
    if (size === 'L') return '20rem';
    if (size === 'XL') return '25rem';
    return null;
  }};
  min-height: ${({ size }) => {
    if (size === 'S') return '3rem';
    if (size === 'M') return '3.5rem';
    if (size === 'L') return '4rem';
    if (size === 'XL') return '5rem';
    return null;
  }};
  font-size: ${({ size }) => {
    if (size === 'S') return '1.4rem';
    if (size === 'M') return '1.6rem';
    if (size === 'L') return '2rem';
    if (size === 'XL') return '2.4rem';
    return null;
  }};
`;

const yellowButton = `
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.white};
  border: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
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

const blueButton = `
  background-color: ${theme.colors.main};
  color: ${theme.colors.white};
  border: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: #275999;
    color: ${theme.colors.white};
  }

  &:disabled, &:disabled:hover {
    background-color: #7CA6DE;
    color: ${theme.colors.white};
  }
`;

const blueOutlineButton = `
  background-color: ${theme.colors.white};
  color: ${theme.colors.main};
  border: .2rem solid ${theme.colors.main};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  
  &:hover {
    color: #275999;
    border: .2rem solid #275999;
  }

  &:disabled, &:disabled:hover {
    background-color: #7CA6DE;
    color: ${theme.colors.white};
  }
`;

const ButtonWithColor = styled(ButtonWithSize)`
  ${({ color }) => {
    if (color === 'yellow') return yellowButton;
    if (color === 'blue') return blueButton;
    if (color === 'blueOutline') return blueOutlineButton;
    return null;
  }}
`;

export default ButtonWithColor;

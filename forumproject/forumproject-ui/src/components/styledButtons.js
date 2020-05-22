import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../layout/theme';

// Properties used for small buttons
const smallBtn = {
  height: '30px',
  padding: '0 20px',
  fontSize: '16px',
};

export const LinkButtonBig = styled(Link)`
  /*  You can adapt the button adding color prop. Colors prop should be one of: green, greenOutline, grey, greyOutline, disabled */
  display: block;
  width: 100%;
  min-height: 40px;
  margin: 0 auto 20px;
  padding: 6.5px;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  text-align: center;
  background-color: ${(props) =>
    props.color === 'green'
      ? theme.colors.main
      : props.color === 'grey'
      ? theme.colors.neutralExtraLight
      : theme.colors.white};
  color: ${(props) =>
    props.color === 'green'
      ? theme.colors.white
      : props.color === 'greenOutline'
      ? theme.colors.main
      : props.color === 'grey'
      ? theme.colors.neutralMidDark
      : props.color === 'greyOutline'
      ? theme.colors.neutralMidDark
      : props.color === 'disabled'
      ? theme.colors.neutralMidLight
      : theme.colors.neutralMidDark};
  border: 1px solid
    ${(props) =>
      props.color === 'green' || props.color === 'greenOutline'
        ? theme.colors.btnMain
        : props.color === 'grey'
        ? theme.colors.neutralLight
        : props.color === 'disabled'
        ? theme.colors.neutralMidLight
        : theme.colors.neutralMidDark};
  border-radius: 5px;
  box-shadow: 0 0 4px ${theme.colors.neutralLight};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.green && '#15AD54'};
    ${(props) =>
      props.color !== 'disabled' &&
      `font-weight: 600;
      box-shadow: 0 0 4px;    
    `}
  }
`;

export const LinkButtonSmall = styled(LinkButtonBig)`
  /* You can adapt the button adding color prop. See LinkButtonBig */
  min-height: ${smallBtn.height};
  padding: ${smallBtn.padding};
  font-size: ${smallBtn.fontSize};
`;

export const SubmitButtonSmall = styled.input`
  /*  You can adapt the button adding color prop. Colors prop should be one of: green, greenOutline, grey, greyOutline, disabled */
  display: block;
  width: 100%;
  min-height: ${smallBtn.height};
  margin: 0 auto 20px;
  padding: ${smallBtn.padding};
  font-size: ${smallBtn.fontSize};
  font-weight: 400;
  text-decoration: none;
  text-align: center;
  background-color: ${(props) =>
    props.color === 'green'
      ? theme.colors.main
      : props.color === 'grey'
      ? theme.colors.neutralExtraLight
      : theme.colors.white};
  color: ${(props) =>
    props.color === 'green'
      ? theme.colors.white
      : props.color === 'greenOutline'
      ? theme.colors.main
      : props.color === 'grey'
      ? theme.colors.neutralMidDark
      : props.color === 'greyOutline'
      ? theme.colors.neutralMidDark
      : props.color === 'disabled'
      ? theme.colors.neutralMidLight
      : theme.colors.neutralMidDark};
  border: 1px solid
    ${(props) =>
      props.color === 'green' || props.color === 'greenOutline'
        ? theme.colors.btnMain
        : props.color === 'grey'
        ? theme.colors.neutralLight
        : props.color === 'disabled'
        ? theme.colors.neutralMidLight
        : theme.colors.neutralMidDark};
  border-radius: 5px;
  box-shadow: 0 0 4px ${theme.colors.neutralLight};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.green && '#15AD54'};
    ${(props) =>
      props.color !== 'disabled' &&
      `font-weight: 600;
      box-shadow: 0 0 4px;    
    `}
  }
`;

export const ButtonSmall = styled.button`
  /*  You can adapt the button adding color prop. Colors prop should be one of: green, greenOutline, grey, greyOutline, disabled */
  min-height: ${smallBtn.height};
  margin: 0 auto 20px;
  padding: ${smallBtn.padding};
  font-size: ${smallBtn.fontSize};
  font-weight: 400;
  text-decoration: none;
  text-align: center;
  background-color: ${(props) =>
    props.color === 'green'
      ? theme.colors.main
      : props.color === 'grey'
      ? theme.colors.neutralExtraLight
      : theme.colors.white};
  color: ${(props) =>
    props.color === 'green'
      ? theme.colors.white
      : props.color === 'greenOutline'
      ? theme.colors.main
      : props.color === 'grey'
      ? theme.colors.neutralMidDark
      : props.color === 'greyOutline'
      ? theme.colors.neutralMidDark
      : props.color === 'disabled'
      ? theme.colors.neutralMidLight
      : theme.colors.neutralMidDark};
  border: 1px solid
    ${(props) =>
      props.color === 'green' || props.color === 'greenOutline'
        ? theme.colors.btnMain
        : props.color === 'grey'
        ? theme.colors.neutralLight
        : props.color === 'disabled'
        ? theme.colors.neutralMidLight
        : theme.colors.neutralMidDark};
  border-radius: 5px;
  box-shadow: 0 0 4px ${theme.colors.neutralLight};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.green && '#15AD54'};
    ${(props) =>
      props.color !== 'disabled' &&
      `font-weight: 600;
      box-shadow: 0 0 4px;    
    `}
  }
`;

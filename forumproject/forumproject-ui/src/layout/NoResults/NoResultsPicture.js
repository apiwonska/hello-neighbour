import styled, { keyframes } from 'styled-components';

import { ReactComponent as Picture } from 'img/no_results.svg';

const openEye = keyframes`
  0% {
    transform: rotate(-17deg) scaleY(1);
  }
   
  20% {
    transform: rotate(-17deg) scaleY(1.5);
  }

  40% {
    transform: rotate(-17deg) scaleY(1);
  }
`;

const moveTail = keyframes`
  0% {
    transform: rotate(10deg);
  }

  20% {
    transform: rotate(0deg);
  }

  40% {
    transform: rotate(10deg);
  }
`;

export default styled(Picture)`
  width: 20rem;
  height: 100%;

  #cat-eye1,
  #cat-eye2 {
    animation: ${openEye} infinite 3s ease;
    transform-origin: center;
    transform-box: fill-box;
  }

  #cat-tail {
    transform: rotate(10deg);
    animation: ${moveTail} infinite 8s ease;
    transform-origin: 0 100%;
    transform-box: fill-box;
  }
`;

import styled, { keyframes } from 'styled-components';

import { ReactComponent as Picture } from 'img/group-chat.svg';

const showOnScreen = keyframes`
  from {
    opacity:0;
    transform: translateY(-1rem);
  }
  
  to {
    opacity:1;
    transform: translateY(0);
  }
`;

const bigWave = keyframes`
  0% {
    transform: rotateZ(0) scaleX(1);
  }

  50% {
    transform: rotateZ(2deg) scaleX(1.05);
  }

  100% {
    transform: rotateZ(0) scaleX(1);
  }
`;

const smallWave = keyframes`
  0% {
    transform: rotateZ(0) scaleX(1);
  }

  50% {
    transform: rotateZ(0.6deg) scaleX(1.05);
  }

  100% {
    transform: rotateZ(0) scaleX(1);
  }
`;

const dotJump = keyframes`
  0% {
    transform: translateY(0);
  }

  8% {
    transform: translateY(-10px);
  }

  16% {
    transform: translateY(0);
  }
`;

const GroupChatPicture = styled(Picture)`
  animation: ${showOnScreen} 1 0.3s ease;

  #big-plant {
    animation: ${smallWave} infinite 3s 1s ease;
    transform-origin: 0 100%;
    transform-box: fill-box;
  }

  #small-plant {
    animation: ${bigWave} infinite 3s 1s ease;
    transform-origin: 0 100%;
    transform-box: fill-box;
  }

  #dot1 {
    animation: ${dotJump} infinite 5s 1s ease;
  }

  #dot2 {
    animation: ${dotJump} infinite 5s 1.25s ease;
  }

  #dot3 {
    animation: ${dotJump} infinite 5s 1.5s ease;
  }
`;

export default GroupChatPicture;

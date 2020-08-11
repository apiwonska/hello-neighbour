import styled, { keyframes } from 'styled-components';

import { ReactComponent as Picture } from 'img/hey-lady.svg';

const waveHand = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  50% {
    transform: rotateZ(-5deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
`;

const WelcomePicture = styled(Picture)`
  width: 100%;
  height: 100%;
  #hand {
    animation: ${waveHand} 2 1.4s ease;
    transform-origin: 100% 100%;
    transform-box: fill-box;
  }
`;

export default WelcomePicture;

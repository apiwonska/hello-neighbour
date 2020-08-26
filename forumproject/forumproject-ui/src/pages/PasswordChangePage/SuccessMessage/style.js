import styled, { keyframes } from 'styled-components';
import { ReactComponent as Picture } from 'img/confirmed.svg';

const changeColor = keyframes`
  0% {
    opacity: 0.3;
  }
  100% {
    opacity:1;
  }
`;

export const ConfirmedPicture = styled(Picture)`
  width: 100%;
  height: 100%;

  animation: ${changeColor} 2s ease;
`;

export const PictureWrapper = styled.div`
  max-width: 6rem;
  margin: 5rem auto 2rem;
`;

import styled, { keyframes } from 'styled-components';

import { theme, Button as Button_ } from 'layout';

export const Container = styled.div`
  width: 100%;
  background-color: ${theme.colors.accessPageBackgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 4rem 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 50rem;
  width: 90%;
`;

const showButton = keyframes`
0% {
  opacity: 0;
}
1% {
  opacity: 1;
  transform: translateY(3rem);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const Button = styled(Button_)`
  text-transform: capitalize;
  margin: 4rem 0;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.4);
  text-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.5);
  font-weight: 600;
  height: auto;
  white-space: normal;
  opacity: 0;
  animation: ${showButton} 1 0.4s 0.5s ease forwards;

  &:hover,
  &:focus {
    box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.4);
    text-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
    color: ${theme.colors.white};
  }
`;

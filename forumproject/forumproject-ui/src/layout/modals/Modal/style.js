import styled from 'styled-components';

import theme from 'layout/theme';

export const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  min-width: ${theme.pageMinWidth};
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  overflow-y: auto;
`;

export const ModalBody = styled.div`
  max-width: 40rem;
  width: 100%;
  background-color: ${theme.colors.white};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  margin: auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;

  &:after {
    width: 80%;
    height: 0.5rem;
    margin: 0 auto;
    background-color: ${theme.colors.secondary};
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
    content: '';
  }
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  margin: 2rem 2rem 0 auto;
  background-color: transparent;
  color: ${theme.colors.neutralMidDark};
  border: none;
  cursor: pointer;
  padding: 0.7rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: 0.4s;

  &:hover {
    background-color: ${theme.colors.main};
    color: ${theme.colors.white};
  }
`;

export const Title = styled.h2`
  text-transform: capitalize;
  text-align: center;
  color: ${theme.colors.main};
  text-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.15);
  width: 85%;
  margin: 0.5rem auto 2rem;
`;

export const Content = styled.div`
  width: 85%;
  margin: 0 auto 4rem;
`;

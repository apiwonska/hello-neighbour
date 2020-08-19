import styled from 'styled-components';

import { theme, Button as Button_ } from 'layout';

export const PageTitle = styled.h2`
  flex-grow: 1;
  margin: 1.5rem;
  text-transform: capitalize;
  color: ${theme.colors.white};
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 1.9rem;
`;

export const Button = styled(Button_)`
  width: 100%;

  @media (min-width: 400px) {
    width: auto;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 2rem 0 2rem;
  justify-content: flex-end;
`;

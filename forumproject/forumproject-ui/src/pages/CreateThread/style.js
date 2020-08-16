import styled from 'styled-components';

import { Button as Button_ } from 'layout';

export const Button = styled(Button_)`
  margin: 1rem 0;
  width: 100%;

  @media (min-width: 450px) {
    width: auto;
    margin: 1rem 1rem;
  }
`;

export const FormGroupButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
`;

import styled from 'styled-components';

import { BasicButton, theme } from 'layout';

export const Button = styled(BasicButton)`
  margin: 0 0.8rem 1.5rem;
  flex-grow: 1;

  ${theme.media.minLandscapePhone} {
    flex-grow: 0;
  }
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: space-evenly;
`;

export const FormWrapper = styled.div`
  margin-bottom: 4rem;
`;

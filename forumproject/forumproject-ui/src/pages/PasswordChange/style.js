import styled from 'styled-components';

import { Button as Button_, theme } from 'layout';

export const Button = styled(Button_)`
  margin: 0 0.8rem 1.5rem;
  flex-grow: 1;

  ${theme.media.minLandscapePhone} {
    flex-grow: 0;
  }
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const FormWrapper = styled.div`
  margin-bottom: 4rem;
`;

export const InnerContentWrapper = styled.div`
  max-width: 60rem;
  margin: 4rem auto;
`;

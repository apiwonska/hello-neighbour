import styled from 'styled-components';

import { Button as Button_, Label as Label_, theme } from 'layout';

export const Button = styled(Button_)`
  width: 100%;
  margin: 1rem 0;
`;

export const Label = styled(Label_)`
  font-size: 1.3rem;
  text-transform: uppercase;
  color: ${theme.colors.neutralMidLight};
  font-weight: 600;
  margin: 0.5rem 0;
`;

export const FormWrapper = styled.div`
  margin-bottom: 4rem;
`;

export const FormButtonsWrapper = styled.div`
  margin-top: 3rem;
`;

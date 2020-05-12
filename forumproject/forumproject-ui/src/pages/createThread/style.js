import styled from 'styled-components';

import { SubmitButtonSmall, ButtonSmall } from '../../components/styledButtons';


export const Button = styled(ButtonSmall)`
  width: 150px;
  margin: 0 10px;
`;

export const SubmitButton = styled(SubmitButtonSmall)`
  width: auto;
  margin: 0 10px;
`;

export const FormGroupButtons = styled.div`
  display: flex;
  justify-content: end;
`;
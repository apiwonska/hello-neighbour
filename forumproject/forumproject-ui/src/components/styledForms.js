import styled from 'styled-components';

import theme from '../layout/utils/theme';

export const Form = styled.form``;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.label``;

export const Input = styled.input``;

export const TextArea = styled.textarea`
  width: 100%;
`;

export const FormError = styled.div`
  color: ${theme.colors.errorMsgText};
  font-size: 12px;
`;

export const FormWrapper = styled.div`
  margin: 30px 0;
`;

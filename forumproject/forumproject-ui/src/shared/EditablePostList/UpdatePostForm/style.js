import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import { theme, Button as Button_ } from 'layout';

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export const Button = styled(Button_)`
  min-width: 10rem;
  margin: 0.8rem;
`;

export const TextArea = styled(TextareaAutosize)`
  width: 100%;
  font-family: ${theme.fonts.default};
  color: ${theme.colors.black};
  font-size: 1.4rem;
  line-height: 1.45;
  border: none;
  resize: none;
`;

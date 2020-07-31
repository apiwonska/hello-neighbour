import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import { theme, Button as Button_ } from 'layout';

export const PostWrapper = styled.div`
  background-color: ${theme.colors.white};
  padding: 1rem;
  margin: 2rem 0;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export const Button = styled(Button_)`
  min-width: 10rem;
  margin: 0.8rem;
`;

export const Content = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  white-space: pre-line;
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

export const PostListWrapper = styled.div`
  margin: 3rem 0;
`;

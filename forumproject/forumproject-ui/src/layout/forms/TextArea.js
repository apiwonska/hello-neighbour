import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import theme from 'layout/theme';

export default styled(TextareaAutosize)`
  width: 100%;
  font-family: ${theme.fonts.default};
  font-size: 1.6rem;
  border-width: 0;
  border-bottom: 0.2rem solid ${theme.colors.black};
  resize: none;

  ${({ value }) => {
    if (!value) {
      return `border-bottom: 0.2rem solid ${theme.colors.neutralMidLight};`;
    }
    return null;
  }};

  &::placeholder {
    color: ${theme.colors.neutralDark};
  }
`;

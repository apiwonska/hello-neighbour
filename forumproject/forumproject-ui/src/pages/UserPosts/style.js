import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from '../../layout';

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const PostHeaderInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ThreadLink = styled(Link)`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${theme.colors.black};
  margin-bottom: 0.3rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const DateSpan = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.neutralMidDark};
`;

export const Content = styled.div`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  font-size: 1.4rem;
  height: auto;
  border: none;
  font-family: ${theme.fonts.default};
  resize: vertical;
  margin-bottom: 1rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: end;
`;

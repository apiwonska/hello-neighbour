import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from '../../layout';

export const PostWrapper = styled.div`
  background-color: ${theme.colors.white};
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px ${theme.colors.neutralMidLight};
  border-radius: ${theme.radius.sm};
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const PostHeaderInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

export const ThreadLink = styled(Link)`
  font-weight: 600;
  color: ${theme.colors.black};
`;

export const DateSpan = styled.span`
  font-size: 12px;
  color: ${theme.colors.neutralMidDark};
`;

export const Content = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  height: auto;
  border: none;
  font-family: ${theme.fonts.default};
  resize: vertical;
  margin-bottom: 10px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: end;
`;

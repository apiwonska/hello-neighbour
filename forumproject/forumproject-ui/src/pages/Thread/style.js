import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../../Layout/theme';
import { SubmitButtonSmall } from '../../components/styledButtons';

export const LinkWrapper = styled.div`
  margin-bottom: 20px;
`;

export const NavLink = styled(Link)`
  color: ${theme.colors.black};
  text-decoration: underline;
`;

export const FirstPostWrapper = styled.div`
  background-color: ${theme.colors.neutralExtraLight};
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px ${theme.colors.neutralMidLight};
  border-radius: ${theme.radius.sm};
`;

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

export const UserLink = styled(Link)`
  font-weight: 600;
  color: ${theme.colors.black};
`;

export const DateSpan = styled.span`
  font-size: 12px;
  color: ${theme.colors.neutralMidDark};
`;

export const ThreadTitle = styled.h4`
  margin: 15px 0;
  font-weight: 600;
`;

export const Content = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const NameSpan = styled.span`
  font-size: 12px;
  margin: 0 20 px;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: auto;
  border: none;
  font-family: ${theme.fonts.default};
  resize: vertical;
  margin-bottom: 10px;
`;

export const SubmitButton = styled(SubmitButtonSmall)`
  width: auto;
  margin: 0 0 0 auto;
  font-family: ${theme.fonts.default};
  /* &:hover {
    cursor: pointer;
  } */
`;

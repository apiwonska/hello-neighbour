import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme, Button as Button_ } from 'layout';

export const PageTitle = styled.h2`
  flex-grow: 1;
  margin: 1.5rem;
  text-transform: capitalize;
  color: ${theme.colors.white};
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 1.9rem;
`;

export const Button = styled(Button_)`
  width: 100%;

  @media (min-width: 400px) {
    width: auto;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 2rem 0 2rem;
  justify-content: flex-end;
`;

export const ThreadWrapper = styled.div`
  background-color: #efefef;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
`;

export const PostWrapper = styled.div`
  background-color: ${theme.colors.white};
  padding: 1rem;
  margin: 1.5rem 0;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const PostHeaderInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
`;

export const Footer = styled.div``;

export const UserLink = styled(Link)`
  font-weight: 600;
  font-size: 1.4rem;
  color: ${theme.colors.black};
`;

export const DateSpan = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.neutralMidDark};
`;

export const ThreadTitle = styled.h4`
  margin: 1.5rem 0;
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

export const AvatarThumbnail = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 10 px;
`;

export const CreatePostWrapper = styled.div`
  margin: 3rem 0;
`;

export const SmallButton = styled(Button_)`
  min-width: 10rem;
  margin: 0 0.8rem;
`;

export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.5rem 0;
`;

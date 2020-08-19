import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from 'layout';

export const ThreadWrapper = styled.div`
  background-color: #efefef;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
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

export const AvatarThumbnail = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 10 px;
`;

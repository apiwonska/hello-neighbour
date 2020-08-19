import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from 'layout';

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

export const AvatarThumbnail = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 10 px;
`;

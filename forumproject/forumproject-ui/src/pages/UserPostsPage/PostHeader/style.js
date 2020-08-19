import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from 'layout';

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

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../../Layout/theme';
import { LinkButtonSmall } from '../../components/styledButtons';

export const LinkButton = styled(LinkButtonSmall)`
  width: 200px;
  margin: 0 0 20px auto;
`;

export const CategoryHeader = styled.h2`
  text-align: center;
  border-top: 2px solid ${theme.colors.main};
  border-bottom: 2px solid ${theme.colors.main};
  padding: 15px 0;
  margin-bottom: 30px;
`;

export const ThreadWrapper = styled.div`
  background-color: ${theme.colors.neutralExtraLight};
  padding: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px ${theme.colors.neutralLight};
  border-radius: ${theme.radius.sm};
`;

export const TitleRowWrapper = styled.div`
  display: flex;
`;

export const ThreadLink = styled(Link)`
  flex-grow: 1;
  margin: 5px 0 15px;
  font-weight: 600;
  text-decoration: none;
  color: ${theme.colors.black};
`;

export const ThreadLengthSpan = styled.span`
  font-size: 14px;
  color: ${theme.colors.neutralMidDark};
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SecondaryText = styled.span`
  font-size: 14px;
  color: ${theme.colors.neutralMidDark};
  margin-right: 15px;
`;

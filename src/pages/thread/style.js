import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../../layout/utils/theme';

export const LinkWrapper = styled.div`
  margin-bottom: 20px;
`;

export const NavLink = styled(Link)`
  color: ${theme.colors.black};
  text-decoration: underline;
`;

export const FirstPostWrapper = styled.div`
  background-color: ${ theme.colors.neutralExtraLight };  
  padding: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px ${ theme.colors.neutralMidLight };
  border-radius: ${ theme.radius.sm };
`;

export const PostWrapper = styled.div`
  background-color: ${ theme.colors.white };  
  padding: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px ${ theme.colors.neutralMidLight };
  border-radius: ${ theme.radius.sm };
`;

export const AddPostForm = styled.div``;

export const UserLink = styled(Link)`
  margin: 5px 0 10px;
  font-weight: 600;
  color: ${theme.colors.black};
`;

export const ThreadTitle = styled.h4`
  margin: 5px 0 10px;
  font-weight: 600;
`;

export const Content = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Footer = styled.div`
  display: flex;
`;

export const DateSpan = styled.span`
  font-size: 14px;
  color: ${ theme.colors.neutralMidDark};
`;
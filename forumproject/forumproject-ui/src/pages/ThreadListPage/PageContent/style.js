import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from 'layout';

export const LinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 3.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  padding: 0 2rem;
  color: #374350;
  border-color: #4d5863;
  border-style: solid;
  border-width: 0.2rem;
  transition: 0.3s;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #000;
    border-color: ${theme.colors.black};
    box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.35);
  }

  ${theme.media.minLandscapePhone} {
    min-width: 20rem;
    width: auto;
    margin-left: auto;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  margin: 4rem 0;
`;

export const ThreadListWrapper = styled.div`
  margin: 4rem 0;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0 1rem;
`;

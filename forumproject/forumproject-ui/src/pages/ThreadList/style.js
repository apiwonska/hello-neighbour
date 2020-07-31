import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme, SVGIcon } from 'layout';

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
  box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.2);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #000;
    border-color: ${theme.colors.black};
    box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.4);
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

export const ThreadWrapper = styled.div`
  background-color: ${theme.colors.white};
  padding: 1.5rem;
  margin: 2.5rem 0;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
`;

export const ThreadHeader = styled.div`
  margin: 0 0 1.5rem;
`;

export const ThreadLink = styled(Link)`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.black};
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 450px) {
    flex-direction: row;
  }
`;

export const ThreadTitle = styled.h3`
  flex-grow: 1;
  margin: 0;
  font-size: 1.7rem;
  overflow-wrap: anywhere;
`;

export const ThreadIcon = styled(SVGIcon)`
  flex-shrink: 0;
  margin: 0.5rem 1rem 0.5rem 0;
  color: ${theme.colors.main};
  width: 2rem;

  ${ThreadLink}:hover & {
    color: #275999;
  }
`;

export const ThreadLengthSpan = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 1.2rem;
  color: ${theme.colors.neutralMidDark};
`;

export const SpeachBubbleIcon = styled(SVGIcon)`
  width: 1.2rem;
  margin-right: 0.5rem;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const GroupFooter = styled.div`
  display: flex;
  margin-right: 2rem;
`;

export const FooterSpan = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.neutralMidDark};
  margin-right: 1rem;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0 1rem;
`;

export const NoResultsInfo = styled.div`
  font-size: 2rem;
  text-align: center;
`;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme, SVGIcon } from 'layout';
import { ReactComponent as Picture } from 'img/start_thread.svg';

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

export const StartThreadPicture = styled(Picture)`
  width: 25rem;
  height: 100%;
`;

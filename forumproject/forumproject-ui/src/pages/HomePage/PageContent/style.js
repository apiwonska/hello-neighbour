import styled from 'styled-components';

import { theme } from 'layout';

export const ForumInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;

  ${theme.media.minLandscapePhone} {
    flex-direction: row;
  }
`;

export const PictureWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 25rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ForumInfoText = styled.div`
  display: flex;
  align-items: center;
  text-align: justify;
  font-size: 1.6rem;
  margin-top: 3rem;

  ${theme.media.minLandscapePhone} {
    margin-top: 0;
    margin-left: 4rem;
  }
`;

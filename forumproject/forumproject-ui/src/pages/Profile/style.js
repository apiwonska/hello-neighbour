import styled from 'styled-components';

import { theme, BasicButton } from 'layout';

export const Button = styled(BasicButton)`
  width: 100%;
  margin: 1rem 0;

  ${theme.media.minLandscapePhone} {
    width: auto;
    margin: 1rem 2rem 1rem 0;
  }
`;

export const GroupWrapper = styled.div`
  margin-bottom: 3rem;

  ${theme.media.minTablet} {
    max-width: 60rem;
  }
`;

export const Avatar = styled.img`
  display: block;
  width: 200px;
  border-radius: 50%;
  border: 0.5rem ${theme.colors.white} solid;
  margin: -8rem auto 0;

  ${theme.media.minLandscapePhone} {
    margin-left: 0;
  }
`;

export const DataGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
  color: ${theme.colors.main};
  font-weight: 600;
  margin: 0;
`;

export const Data = styled.p`
  font-size: 1.6rem;
  margin: 0;
`;

export const DataWrapper = styled.div`
  margin-bottom: 2rem;
`;

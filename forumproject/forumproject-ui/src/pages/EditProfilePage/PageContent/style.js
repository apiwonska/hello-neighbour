import styled from 'styled-components';

import { theme } from 'layout';

// eslint-disable-next-line import/prefer-default-export
export const InnerContentWrapper = styled.div`
  ${theme.media.minTablet} {
    max-width: 60rem;
    margin: 4rem auto 5rem;
  }
`;

import styled from 'styled-components';

import theme from 'layout/theme';

export default styled.div`
  margin-bottom: 3rem;

  ${theme.media.minTablet} {
    max-width: 60rem;
  }
`;

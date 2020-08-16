import styled from 'styled-components';

import theme from 'layout/theme';

export default styled.h2`
  flex-grow: 1;
  margin: 1.5rem;
  text-transform: capitalize;
  color: ${theme.colors.white};
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  text-align: center;
`;

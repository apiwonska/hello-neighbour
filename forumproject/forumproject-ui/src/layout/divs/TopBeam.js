import styled from 'styled-components';

import theme from 'layout/theme';

export default styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 10rem;
  background-color: ${theme.colors.secondary};
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.15);
  margin-bottom: 4rem;
`;

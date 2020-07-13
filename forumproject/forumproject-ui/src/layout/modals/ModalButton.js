import styled from 'styled-components';

import Button from '../buttons/Button';

export default styled(Button)`
  display: block;
  width: 100%;
  margin: 4rem auto 0;

  @media (min-width: 500px) {
    width: auto;
  }
`;

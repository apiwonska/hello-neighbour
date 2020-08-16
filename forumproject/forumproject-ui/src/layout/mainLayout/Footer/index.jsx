import React from 'react';
import { useSelector } from 'react-redux';

import StyledFooter from './style';

function Footer() {
  const auth = useSelector((state) => !!state.auth.authenticated);

  return (
    <StyledFooter auth={auth}>
      Copyrights &#169; 2020 Anna Piwońska
    </StyledFooter>
  );
}

export default Footer;

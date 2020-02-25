import React from 'react';

import {
  Spinner as StyledSpinner,
  WrapperDiv,
  InnerWrapperDiv
 } from './style'

const Spinner = () => {
  return (
    <WrapperDiv>
      <InnerWrapperDiv>
        <StyledSpinner/>
      </InnerWrapperDiv>      
    </WrapperDiv>
  )
}

export default Spinner;
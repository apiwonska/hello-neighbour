import styled from 'styled-components';

import theme from 'layout/theme';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: auto;
`;

export const MoreBtn = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  padding: 0;
  color: ${({ isOpen }) =>
    isOpen ? theme.colors.neutralMidLight : theme.colors.neutralLight};
  background-color: transparent;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: ${theme.colors.neutralMidDark};
  }
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0.5rem;
  background-color: #efefef;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  padding: 0.8rem 0;
  z-index: 1;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #000;
  }
`;

export const IconSpan = styled.span`
  flex-shrink: 0;
  width: 1.6rem;
  margin-right: 1rem;
`;

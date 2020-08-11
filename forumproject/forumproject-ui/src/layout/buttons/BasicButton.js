import styled from 'styled-components';
import theme from 'layout/theme';

export default styled.button`
  min-width: 15rem;
  font-size: 1.6rem;
  padding: 0.4rem 2rem;
  min-height: 3.5rem;
  font-family: ${theme.fonts.default};
  line-height: 1.45;
  background-color: ${theme.colors.white};
  color: #374350;
  border-color: #4d5863;
  border-style: solid;
  border-width: 0.2rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:disabled,
  &:disabled:hover {
    color: #a6abb1;
    border-color: #a6abb1;
    background-color: ${theme.colors.white};
  }

  &:hover {
    cursor: pointer;
    color: #000;
    border-color: ${theme.colors.black};
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  }
`;

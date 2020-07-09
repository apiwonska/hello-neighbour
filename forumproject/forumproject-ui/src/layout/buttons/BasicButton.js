import styled from 'styled-components';
import theme from 'layout/theme';

export default styled.button`
  min-width: 15rem;
  min-height: 3rem;
  font-size: 1.6rem;
  font-family: ${theme.fonts.default};
  line-height: 1.45;
  padding: 0 2rem;
  background-color: ${theme.colors.white};
  color: ${theme.colors.main};
  border-color: ${theme.colors.main};
  border-style: solid;
  border-width: 0.2rem;
  transform: translateY(0);
  transition: 0.3s;

  &:disabled,
  &:disabled:hover {
    color: gray;
    border-color: gray;
    background-color: ${theme.colors.white};
  }

  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.main};
    color: ${theme.colors.white};
    transform: translateY(-0.1rem);
  }
`;

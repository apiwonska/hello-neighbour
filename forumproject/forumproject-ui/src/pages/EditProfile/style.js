import styled from 'styled-components';

import {
  BasicButton,
  Input as Input_,
  Label as Label_,
  TextArea as TextArea_,
  theme,
} from 'layout';

export const Button = styled(BasicButton)`
  margin: 0 0.8rem 1.5rem;
  flex-grow: 1;

  ${theme.media.minLandscapePhone} {
    flex-grow: 0;
  }
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: space-evenly;
`;

export const Avatar = styled.img`
  display: block;
  width: 20rem;
  border-radius: 50%;
  border: 0.5rem ${theme.colors.white} solid;
  margin: -8rem auto 0;

  ${theme.media.minLandscapePhone} {
    margin-left: 0;
  }
`;

export const FileInput = styled.input`
  position: absolute;
  left: -99999rem;
`;

export const FileInputLabel = styled.label`
  height: 3rem;
  font-size: 1.6rem;
  padding: 0 2rem;
  background-color: ${theme.colors.white};
  color: ${theme.colors.main};
  border-color: ${theme.colors.main};
  border-style: solid;
  border-width: 0.2rem;
  transition: 0.5s;
  cursor: pointer;
  margin: 0 0.8rem 1.5rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.main};
    color: ${theme.colors.white};
  }

  ${theme.media.minLandscapePhone} {
    flex-grow: 0;
  }
`;

export const Input = styled(Input_)`
  border-color: ${theme.colors.main};
`;

export const Label = styled(Label_)`
  color: ${theme.colors.main};
`;

export const TextArea = styled(TextArea_)`
  border-color: ${theme.colors.main};
`;

export const FormWrapper = styled.div`
  margin-bottom: 4rem;
`;

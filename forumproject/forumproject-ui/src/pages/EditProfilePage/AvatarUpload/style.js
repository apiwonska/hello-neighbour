import styled from 'styled-components';

import { Button as Button_, theme } from 'layout';

export const UploadButton = styled(Button_)`
  margin: 1rem 0.8rem;
  flex-grow: 1;

  ${theme.media.minLandscapePhone} {
    flex-grow: 0;
  }
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Avatar = styled.img`
  display: block;
  width: 20rem;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
`;

export const FileInput = styled.input`
  position: absolute;
  left: -99999rem;
`;

export const FileInputLabel = styled.label`
  height: 3.5rem;
  font-size: 1.6rem;
  padding: 0 2rem;
  margin: 1rem 0.8rem;
  background-color: ${theme.colors.white};
  color: #374350;
  border-color: #4d5863;
  border-style: solid;
  border-width: 0.2rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  cursor: pointer;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
    border-color: ${theme.colors.black};
    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  }

  ${theme.media.minLandscapePhone} {
    flex-grow: 0;
  }
`;

import styled from 'styled-components';

import { Button as Button_, Label as Label_, theme } from 'layout';

export const UploadButton = styled(Button_)`
  margin: 1rem 0.8rem;
  flex-grow: 1;

  ${theme.media.minLandscapePhone} {
    flex-grow: 0;
  }
`;

export const Button = styled(Button_)`
  width: 100%;
  margin: 1rem 0;
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const InnerContentWrapper = styled.div`
  ${theme.media.minTablet} {
    max-width: 60rem;
    margin: 4rem auto 5rem;
  }
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

export const Label = styled(Label_)`
  font-size: 1.3rem;
  text-transform: uppercase;
  color: ${theme.colors.neutralMidLight};
  font-weight: 600;
  margin: 0.5rem 0;
`;

export const FormWrapper = styled.div`
  margin-bottom: 4rem;
`;

export const FormButtonsWrapper = styled.div`
  margin-top: 3rem;
`;

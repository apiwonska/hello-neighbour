import styled from 'styled-components';

import theme from '../../layout/utils/theme';

export const ImageWrapper = styled.div``;

export const Avatar = styled.img`
  display: block;
  width: 200px;
  border-radius: 50%;
  margin: 0 auto 20px;
`;

export const DataGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.p`
  /* font-size: 16px; */
  text-transform: uppercase;
  color: ${theme.colors.neutralMidLight};
  font-weight: 600;
  margin: 0;
`;

export const Data = styled.p`
  margin: 0;
`;

export const DataWrapper = styled.div`
  margin-bottom: 30px;
`;

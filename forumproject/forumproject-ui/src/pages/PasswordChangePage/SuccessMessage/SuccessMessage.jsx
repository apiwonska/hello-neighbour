import React from 'react';
import PropTypes from 'prop-types';

import { InfoText, TextLink, GroupWrapper } from 'layout';
import { PictureWrapper, ConfirmedPicture } from './style';

const SuccessMessage = ({ authUserId }) => {
  return (
    <GroupWrapper>
      <PictureWrapper>
        <ConfirmedPicture />
      </PictureWrapper>

      <InfoText>
        Your password was changed! You can go back to your{' '}
        <TextLink to={`/profile/${authUserId}`}>profile</TextLink> now.
      </InfoText>
    </GroupWrapper>
  );
};

SuccessMessage.propTypes = {
  authUserId: PropTypes.number.isRequired,
};

export default SuccessMessage;

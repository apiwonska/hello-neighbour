import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withHandleErrors, withLoading } from 'shared/hoc';
import { ContentWrapper, GroupWrapper, PageTitleBlock } from 'layout';
import { InnerContentWrapper } from './style';
import PageBreadcrumb from '../PageBreadcrumb';
import AvatarUpload from '../AvatarUpload';
import UserDataForm from '../UserDataForm';

const PageContent = ({
  authUserId,
  user,
  handleFileSelect,
  handleFileUpload,
  handleUpdateInfo,
}) => {
  const { username, email, description } = user.data;
  const initialFormValues = { username, email, description };

  return (
    <>
      <PageTitleBlock title="Edit Your Profile" />

      <ContentWrapper>
        <PageBreadcrumb authUserId={authUserId} />

        <InnerContentWrapper>
          <AvatarUpload
            avatarSrc={user.data.avatar}
            handleFileSelect={handleFileSelect}
            handleFileUpload={handleFileUpload}
            uploadErrors={user.uploadErrors.avatar}
          />

          <GroupWrapper>
            <UserDataForm
              authUserId={authUserId}
              initialFormValues={initialFormValues}
              handleUpdateInfo={handleUpdateInfo}
            />
          </GroupWrapper>
        </InnerContentWrapper>
      </ContentWrapper>
    </>
  );
};

PageContent.propTypes = {
  authUserId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    uploadErrors: PropTypes.shape({
      avatar: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      description: PropTypes.string,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleFileSelect: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleUpdateInfo: PropTypes.func.isRequired,
};

export default compose(withHandleErrors, withLoading)(PageContent);

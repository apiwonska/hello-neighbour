import React from 'react';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withHandleErrors, withLoading } from 'shared/hoc';
import { ContentWrapper, PageTitleBlock } from 'layout';
import {
  Button,
  Avatar,
  DataGroup,
  Label,
  Data,
  DataWrapper,
  InnerContentWrapper,
} from './style';
import PageBreadcrumb from '../PageBreadcrumb';

const PageContent = ({ user, authUserIsProfileOwner }) => {
  const history = useHistory();
  const defaultDescription = "This user doesn't have a description yet";

  return (
    <>
      <PageTitleBlock title="User Profile" />

      <ContentWrapper>
        <PageBreadcrumb />

        <InnerContentWrapper>
          <Avatar src={user.avatar} alt="User avatar" />

          <DataWrapper>
            <DataGroup>
              <Label> Username: </Label>
              <Data>{user.username}</Data>
            </DataGroup>
            {authUserIsProfileOwner && (
              <DataGroup>
                <Label> Email: </Label>
                <Data> {user.email} </Data>
              </DataGroup>
            )}
            <DataGroup>
              <Label> Description: </Label>
              <Data> {user.description || defaultDescription} </Data>
            </DataGroup>
          </DataWrapper>

          {authUserIsProfileOwner && (
            <>
              <Button
                onClick={() => history.push('/profile/edit')}
                color="blue"
              >
                Edit Profile
              </Button>
              <Button onClick={() => history.push('/profile/password-change')}>
                Change Password
              </Button>
            </>
          )}
        </InnerContentWrapper>
      </ContentWrapper>
    </>
  );
};

PageContent.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    avatar: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
  }).isRequired,
  authUserIsProfileOwner: PropTypes.bool.isRequired,
};

export default compose(withHandleErrors, withLoading)(PageContent);

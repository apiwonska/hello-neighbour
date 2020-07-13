import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { ContentWrapper, Spinner, TopBeam } from 'layout';
import { renderPageError } from 'shared/errors';
import { fetchUser as fetchUser_ } from 'redux/actions';
import {
  Button,
  GroupWrapper,
  Avatar,
  DataGroup,
  Label,
  Data,
  DataWrapper,
} from './style';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
    };
  }

  componentDidMount() {
    this.checkIsOwner();
    const { fetchUser, match } = this.props;
    const { userId } = match.params;

    if (this.checkNeedFetchUser) {
      fetchUser(userId);
    }
  }

  checkIsOwner() {
    const { owner, match } = this.props;
    const { userId } = match.params;
    if (owner) {
      this.setState({ isOwner: String(owner.id) === userId });
    }
  }

  checkNeedFetchUser() {
    const { user, match } = this.props;
    const { userId } = match.params;
    return !user.fetched || String(user.data.id) !== userId;
  }

  renderField(label, objKey, defaultText) {
    const { user } = this.props;
    return (
      <DataGroup>
        <Label>{label}</Label>
        <Data> {user.data[objKey] || defaultText} </Data>
      </DataGroup>
    );
  }

  renderUserData() {
    const { user } = this.props;
    const { isOwner } = this.state;
    const defaultDescription = "This user doesn't have a description yet";
    return (
      <DataWrapper>
        <DataGroup>
          <Label> Username: </Label>
          <Data>{user.data.username}</Data>
        </DataGroup>
        {isOwner && (
          <DataGroup>
            <Label> Email: </Label>
            <Data> {user.data.email} </Data>
          </DataGroup>
        )}
        <DataGroup>
          <Label> Description: </Label>
          <Data> {user.data.description || defaultDescription} </Data>
        </DataGroup>
      </DataWrapper>
    );
  }

  render() {
    const { user, history } = this.props;
    const { isOwner } = this.state;

    if (this.checkNeedFetchUser()) {
      return null;
    }

    if (user.fetching) {
      return <Spinner />;
    }

    if (!_.isEmpty(user.errors)) {
      return renderPageError();
    }

    if (user.fetched) {
      return (
        <>
          <TopBeam />
          <ContentWrapper>
            <GroupWrapper>
              <Avatar src={user.data.avatar} alt="User avatar" />
            </GroupWrapper>
            <GroupWrapper>
              {this.renderUserData()}
              {isOwner && (
                <>
                  <Button onClick={() => history.push('/profile/edit')}>
                    Edit Profile
                  </Button>
                  <Button
                    onClick={() => history.push('/profile/password-change')}
                  >
                    Change Password
                  </Button>
                </>
              )}
            </GroupWrapper>
          </ContentWrapper>
        </>
      );
    }
    return null;
  }
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ userId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  owner: state.auth.user,
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser: fetchUser_ })(Profile);

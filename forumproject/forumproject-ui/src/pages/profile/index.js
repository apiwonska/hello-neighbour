import React from 'react';
import { connect } from 'react-redux';

import { ContainerDiv } from '../../components/styledDivs';
import { LinkButtonSmall as Button } from '../../components/styledButtons';
import {
  ImageWrapper,
  Avatar,
  DataGroup,
  Label,
  Data,
  DataWrapper
} from './style';
import { renderPageError } from '../../components/errors';
import Spinner from '../../components/spinner';
import { fetchUser } from '../../redux/actions';


class Profile extends React.Component {

  state = {
    isOwner: false
  }

  componentDidMount() {    
    this.checkIsOwner();
    const userId = this.props.match.params.userId;

    if (this.checkNeedFetchUser) {
      this.props.fetchUser(userId);
    };
  }

  checkIsOwner() {
    const { owner } = this.props;
    const userId = this.props.match.params.userId;
    if (owner) {
      this.setState({isOwner: String(owner.id) === userId});
    }
  }

  checkNeedFetchUser() {
    const userId = this.props.match.params.userId;
    const { user } = this.props;
    return !user.fetched || String(user.data.id) !== userId;
  }

  renderField(label, objKey, defaultText) {
    return (
      <DataGroup>
        <Label> { label } </Label>
        <Data> { this.props.user.data[objKey] || defaultText } </Data>
      </DataGroup>
    );
  }

  renderUserData() {
    const { user } = this.props;
    const defaultDescription = 'This user doesn\'t have a description yet';
    return (
      <DataWrapper>
        <DataGroup>
          <Label> Username: </Label>
          <Data> { user.data['username'] } </Data>
        </DataGroup>
        { this.state.isOwner &&
          <DataGroup>
            <Label> Email: </Label>
            <Data> { user.data['email'] } </Data>
          </DataGroup>
        }
        <DataGroup>
          <Label> Description: </Label>
          <Data> { user.data['description'] || defaultDescription } </Data>
        </DataGroup>
      </DataWrapper>
    )
  }

  render() {
    const { user } = this.props;

    if (this.checkNeedFetchUser()) { return null }

    if (user.fetching) { return <Spinner/>; };

    if (user.errors) { return renderPageError(); };

    if (user.fetched) {
      const postsBtnText = this.state.isOwner 
                              ? "Your posts"
                              : "User's posts"

      return (
        <ContainerDiv>
          <ImageWrapper>
            <Avatar src={ user.data.avatar} alt="User avatar"/>
          </ImageWrapper>
          { this.renderUserData() }
          { this.state.isOwner &&
            <>
              <Button to='/' color="greenOutline">Edit Profile</Button>
              <Button 
                to={`/profile/password-change`} 
                color="greenOutline"
              >
                Change Password
              </Button>
            </>
          }
          <Button 
            to={`/profile/posts`}
            color = "greenOutline" 
          >
            {
              this.state.isOwner ? 'Your posts' : 'User\'s posts'
            }
          </Button>
        </ContainerDiv>
      )
    };
  }
}

const mapStateToProps = (state) => {
  return (
    {
      owner: state.auth.user,
      user: state.user
    }
  )
}

export default connect(mapStateToProps, {fetchUser})(Profile);
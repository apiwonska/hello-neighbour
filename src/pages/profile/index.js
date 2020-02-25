import React from 'react';

import { ContainerDiv } from '../../components/common/styledDivs';
import { LinkButtonSmall as Button } from '../../components/common/styledButtons';
import {
  ImageWrapper,
  ProfileImg,
  DataGroup,
  Label,
  Data,
  DataWrapper
} from './style';
import ProfileImgSrc from '../../img/user.jpg'

const user = {
  "name": "Jane Doe",
  "username": "jane.doe",
  "email": "jane.doe@gmail.com",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
};

const fields = [
  ["Name", "name"],
  ["Username", "username"],
  ["Email", "email"],
  ["About me", "description"]
];

class Profile extends React.Component {
  renderUserData() {
    const userData = fields.map((field, ind) => {    
      return (
        <DataGroup key={ ind }>
          <Label>
            { field[0] }:
          </Label>
          <Data>
            { user[field[1]] }
          </Data>
        </DataGroup>
      )
    })
    return userData 
  }

  render() {
    return (
      <ContainerDiv>
        <ImageWrapper>
          <ProfileImg src={ProfileImgSrc}/>
        </ImageWrapper>
        <DataWrapper>
          { this.renderUserData() }
        </DataWrapper>
        {/* <Button to='/' color="greenOutline">Edit Profile</Button>
        <Button to='/' color="greenOutline">Your Posts</Button> */}
      </ContainerDiv>
    )
  }  
}


export default Profile;